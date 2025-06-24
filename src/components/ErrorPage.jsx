import React from 'react';

export default function ErrorPage({ code }) {
    const getErrorDetails = (code) => {
        switch (code) {
            case 400:
                return {
                    title: "Bad Request",
                    description: "The server could not understand the request due to invalid syntax.",
                    image: "/img/400.png" // Gambar untuk error 400
                };
            case 401:
                return {
                    title: "Unauthorized",
                    description: "You are not authorized to view this page.",
                    image: "/img/401.png" // Gambar untuk error 401
                };
            case 403:
                return {
                    title: "Forbidden",
                    description: "You do not have permission to access this page.",
                    image: "/img/403.png" // Gambar untuk error 403
                };
            case 404:
            default:
                return {
                    title: "Page Not Found",
                    description: "The page you are looking for might have been removed or is temporarily unavailable.",
                    image: "/img/404.png" // Gambar untuk error 404
                };
        }
    };

    const errorDetails = getErrorDetails(code);

    return (
        <div id="error-page-container" className="flex flex-col items-center justify-center p-6 text-center">
            <img src={errorDetails.image} alt="Error Image" className="w-40 h-40 mb-4" />
            <h1 className="text-4xl font-semibold text-red-500">{code}</h1>
            <p className="text-lg text-gray-600 mt-4">{errorDetails.description}</p>
        </div>
    );
}
