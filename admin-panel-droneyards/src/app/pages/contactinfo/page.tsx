"use client";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';

interface Contact {
    _id: string;
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    state: string;
    message: string;
    createdAt: string; // Storing the date string
}

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/contact'); // Adjust the port as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch contacts');
                }
                const data: Contact[] = await response.json();
                setContacts(data);
                setFilteredContacts(data); // Set initial filtered contacts
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        // Filter contacts based on the selected date range
        const filtered = startDate && endDate
            ? contacts.filter(contact => {
                const contactDate = new Date(contact.createdAt); // Create a Date object from the ISO string
                return contactDate >= new Date(startDate) && contactDate <= new Date(endDate);
            })
            : contacts; // Show all contacts if no filter is applied

        setFilteredContacts(filtered);
    }, [startDate, endDate, contacts]);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    type="date"
                    label=""
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginLeft: '20px', marginTop: "15px" }}
                />
                <TextField
                    type="date"
                    label=""
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginLeft: '50px', marginTop: "15px" }}
                />
                <Button variant="contained" onClick={() => { setStartDate(''); setEndDate(''); }} sx={{ marginTop: "20px", marginLeft: "10px" }}>
                    Reset
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Country Code</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.countryCode}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.state}</TableCell>
                                <TableCell>{contact.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ContactsPage;
