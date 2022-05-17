import { render, act, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import axios from 'axios';
import "@testing-library/jest-dom/extend-expect";
import getSection from './components/GetSection/view';

jest.mock('axios');


test('[query DOM] renders text on screen', async () => {
    render(<App />);
    const titleGet = await screen.findByText('React Axios GET');
    expect(titleGet).toBeInTheDocument();
    const buttonGetAll = await screen.findByText('Get All');
    expect(buttonGetAll).toBeInTheDocument();
    const buttonClear = await screen.findAllByText('Clear');
    //expect that button Clear has 2 elements
    expect(buttonClear.length).toBe(2);
    const titlePost = await screen.findByText('React Axios POST');
    expect(titlePost).toBeInTheDocument();
    const buttonPost = await screen.findByText('Post Data');
    expect(buttonPost).toBeInTheDocument();
    const inputTest = await screen.getByPlaceholderText('Title');
    expect(inputTest).toBeInTheDocument();
    const inputDesc = await screen.getByPlaceholderText('Description');
    expect(inputDesc).toBeInTheDocument();
});

test('[user event] renders text using user event', async () => {
    render(<App />);
    const testText = "Title Sample";
    const testDesc = "Description Sample";
    
    const inputTitle= screen.getByPlaceholderText('Title');
    const inputDesc= screen.getByPlaceholderText('Description');
    userEvent.type(inputTitle, testText)
    userEvent.type(inputDesc, testDesc)

    const textElement = await screen.findByText("Title: "+testText);
    expect(textElement).toBeInTheDocument();
    const textElement2 = await screen.findByText("Description: "+testDesc);
    expect(textElement2).toBeInTheDocument();
});

//test mock get data by pressing get all button
test('[mock axios] renders text using mock axios', async () => {
    const status = 200;
    const headers = "headers";
    const id = 1;
    const name = "test";
    const price = 100;
    const stock = 10;
    const imageUrl = "https://www.google.com";
    const mockResponse = {
        status: status,
        headers: headers,
        data : {
            data: {
            id: id,
            name: name,
            price: price,
            stock: stock,
            imageUrl: imageUrl
        }
    }

    }
    await act(async () => {
        render(<App />);
        const buttonGetAll = await screen.findByText('Get All');
        userEvent.click(buttonGetAll);
        await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        console.log(mockResponse);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
