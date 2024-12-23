import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const ViewClient = () => {
    const { setUser } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const optionsRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        fetchClients(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchClients = async (sortField) => {
        try {
            const response = await fetch(`http://localhost:4000/clients?sort=${sortField}&order=desc`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch clients');
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSortChange = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
    };

    return (
        <>
            <nav className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
                <div className='logoGroup flex gap-4 items-center'>
                    <img src='../xeno.png' className='w-12 h-12' alt="Logo" />
                    <h1 className="text-xl font-bold">
                        <RouterLink to="/" className="hover:text-gray-300 transition duration-200">
                            PocketCRM
                        </RouterLink>
                    </h1>
                </div>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>

            <div className="w-full flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex flex-col justify-center p-8 w-full max-w-4xl">
                    <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-4">View Your Clients</h2>
                    <div className="relative flex justify-start">
                        <div className="flex cursor-pointer items-center bg-white px-4 py-2 border-2 border-transparent hover:border-blue-800 rounded-lg" onClick={() => setShowOptions(!showOptions)}>
                            <img src="sort.png" className='w-6 h-6 mr-2' alt="Sort By" />
                            <span className="text-xl">Sort By</span>
                        </div>
                        {showOptions && (
                            <ul ref={optionsRef} className="origin-top-right absolute top-full left-0 mt-1 shadow-md bg-white rounded-lg w-auto" style={{ minWidth: '100px' }}>
                                <li className="px-4 py-2 hover:bg-blue-100" onClick={() => handleSortChange('totalSpends')}>Total Spends</li>
                                <li className="px-4 py-2 hover:bg-blue-100" onClick={() => handleSortChange('maxVisits')}>Max Visits</li>
                                <li className="px-4 py-2 hover:bg-blue-100" onClick={() => handleSortChange('lastVisit')}>Last Visit</li>
                            </ul>
                        )}
                    </div>

                    {clients.length > 0 ? (
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                            <thead>
                                <tr className="bg-blue-900 text-white uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">ID</th>
                                    <th className="py-3 px-6 text-center">Name</th>
                                    <th className="py-3 px-6 text-center">Email</th>
                                    <th className="py-3 px-6 text-center">Total Spends</th>
                                    <th className="py-3 px-6 text-center">Max Visits</th>
                                    <th className="py-3 px-6 text-center">Last Visit</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {clients.map(client => (
                                    <tr key={client._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center">{client._id}</td>
                                        <td className="py-3 px-6 text-center">{client.name}</td>
                                        <td className="py-3 px-6 text-center">{client.email}</td>
                                        <td className="py-3 px-6 text-center">{client.totalSpends}</td>
                                        <td className="py-3 px-6 text-center">{client.maxVisits}</td>
                                        <td className="py-3 px-6 text-center">{new Date(client.lastVisit).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-lg font-semibold py-4">
                            No matching records found
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewClient;
