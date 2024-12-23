import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const ViewAudience = () => {
    const { setUser } = useContext(AuthContext);
    const [audiences, setAudiences] = useState([]);
    const [selectedAudience, setSelectedAudience] = useState('');
    const [clients, setClients] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const fetchAudiences = async () => {
            try {
                const response = await fetch('http://localhost:4000/audience', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch audiences');
                const data = await response.json();
                setAudiences(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAudiences();
    }, []);

    const fetchClients = async (audienceName) => {
        try {
            const response = await fetch(`http://localhost:4000/audience/${audienceName}`, {
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

    const handleAudienceChange = (event) => {
        const audienceName = event.target.value;
        setSelectedAudience(audienceName);
        if (audienceName) {
            fetchClients(audienceName);
        } else {
            setClients([]);
        }
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

            <div className="w-full flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 gap-60">
                <div className="flex flex-col items-center justify-center p-8">
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-4 animate-fade-in">View Your Audience</h2>

                    <select
                        value={selectedAudience}
                        onChange={handleAudienceChange}
                        className="mb-4 w-full max-w-lg px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an Audience</option>
                        {audiences.map(audience => (
                            <option key={audience._id} value={audience.name}>
                                {audience.name}
                            </option>
                        ))}
                    </select>

                    {clients.length > 0 ? (
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
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
                        selectedAudience && (
                            <div className="text-center text-lg font-semibold py-4">
                                No matching records found
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewAudience;