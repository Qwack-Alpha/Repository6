import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AnimeCrudOperations from './AnimeCrudOperations';

jest.mock('axios');

describe('AnimeCrudOperations', () => {
  const mockAnimeList = [
    { id: 1, name: 'Anime 1', synopsis: 'Synopsis 1', rating: 4.5 },
    { id: 2, name: 'Anime 2', synopsis: 'Synopsis 2', rating: 3.2 },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockAnimeList });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component', async () => {
    render(<AnimeCrudOperations />);
    const nameElement = await screen.findByText('Name');
    const synopsisElement = await screen.findByText('Synopsis');
    const ratingElement = await screen.findByText('Rating');

    expect(nameElement).toBeInTheDocument();
    expect(synopsisElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });

  test('fetches anime list on component mount', async () => {
    render(<AnimeCrudOperations />);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:6005/anime/readP');

    const anime1Elements = await screen.findAllByText('Anime 1');
    const anime2Elements = await screen.findAllByText('Anime 2');

    expect(anime1Elements).toHaveLength(1);
    expect(anime2Elements).toHaveLength(1);
  });

  test('creates a new anime', async () => {
    const newAnime = { id: 3, name: 'New Anime', synopsis: 'New Synopsis', rating: 5 };
    axios.post.mockResolvedValue({ data: newAnime });
    render(<AnimeCrudOperations />);

    const nameInput = await screen.findByPlaceholderText('Enter name');
    const synopsisInput = await screen.findByPlaceholderText('Enter synopsis');
    const ratingInput = await screen.findByPlaceholderText('Enter rating');
    const addButton = await screen.findByText('Add Anime');

    fireEvent.change(nameInput, { target: { value: 'New Anime' } });
    fireEvent.change(synopsisInput, { target: { value: 'New Synopsis' } });
    fireEvent.change(ratingInput, { target: { value: '5' } });
    fireEvent.click(addButton);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:6005/anime/addP', {
      name: 'New Anime',
      synopsis: 'New Synopsis',
      rating: 5,
    });

    const newAnimeElements = await screen.findAllByText('New Anime');
    expect(newAnimeElements).toHaveLength(1);
  });

  test('updates an existing anime', async () => {
    const updatedAnime = { id: 1, name: 'Updated Anime', synopsis: 'Updated Synopsis', rating: 4.0 };
    axios.put.mockResolvedValue({ data: updatedAnime });
    render(<AnimeCrudOperations />);

    const editButton = await screen.findAllByText('Edit');
    fireEvent.click(editButton[0]);

    const nameInput = await screen.findByPlaceholderText('Enter name');
    const synopsisInput = await screen.findByPlaceholderText('Enter synopsis');
    const ratingInput = await screen.findByPlaceholderText('Enter rating');
    const updateButton = await screen.findByText('Update Anime');

    fireEvent.change(nameInput, { target: { value: 'Updated Anime' } });
    fireEvent.change(synopsisInput, { target: { value: 'Updated Synopsis' } });
    fireEvent.change(ratingInput, { target: { value: '4' } });
    fireEvent.click(updateButton);

    expect(axios.put).toHaveBeenCalledWith('http://localhost:6005/anime/updateP/1', {
      id: 1,
      name: 'Updated Anime',
      synopsis: 'Updated Synopsis',
      rating: 4.0,
    });

    const updatedAnimeElements = await screen.findAllByText('Updated Anime');
    expect(updatedAnimeElements).toHaveLength(1);
  });

  test('deletes an anime', async () => {
    axios.delete.mockResolvedValue({});
    render(<AnimeCrudOperations />);

    const deleteButton = await screen.findAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:6005/anime/deleteP/1');

    const anime1Elements = screen.queryAllByText('Anime 1');
    expect(anime1Elements).toHaveLength(0);
  });
});