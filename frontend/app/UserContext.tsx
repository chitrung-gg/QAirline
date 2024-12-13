"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/interfaces/user';
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from 'axios';


const UserContext = createContext<any>(null);

export interface ContextData {
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    account: {
        id: number;
        username: string;
        role: UserRole;
    };
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    //console.log('Token in UserContext:', token);

    const pathname = usePathname();

    const defaultUser = {
        isLoading: true,
        isAuthenticated: false,
        account: {}
    }

    // const defaultContextData = {
    //     accessToken: '',
    //     refreshToken: '',
    //     isAuthenticated: false,
    //     account: {
    //         id: 0,
    //         username: '',
    //         //role: UserRole.USER
    //     }
    // }

    const [user, setUser] = useState({
        isLoading: true,
        isAuthenticated: false,
        account: {}
    });

    //const [contextData, setContextData] = useState<ContextData>(defaultContextData);

    const loginContext = (userData: ContextData) => {
        setUser({ ...userData, isLoading: false });
        //setContextData(userData);
    };

    const logoutContext = () => {

        setUser(() => ({
            isLoading: false,
            isAuthenticated: false,
            account: {}
        }));
        //setContextData(defaultContextData);
    };

    const fetchUserContext = async () => {
        console.log('Fetching user data...  ', token);
        try {
            const response = await axios.post("http://localhost:5000/authentication", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); // Call API to get true or false
            console.log(response);

            if (response.status === 201) {
                console.log('User authenticated');
                setUser({
                    isLoading: false,   
                    isAuthenticated: true,
                    account: {
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        role: response.data.role
                    }
                });
            } else {
                console.log('User not authenticated ');
                setUser(() => ({
                    isLoading: false,
                    isAuthenticated: false,
                    account: {}
                }));
                console.log(user);

            }
        } catch (error) {
            console.error('Error fetching user account:', error);
            setUser(() => ({
                isLoading: false,
                isAuthenticated: false,
                account: {}
            }));
        }
        console.log('User state after fetching:', user); // Check state here
    };


    useEffect(() => {
        if (token && !user.isAuthenticated) {
            console.log('Token exists, fetch:', token);
            fetchUserContext();
        } else {
            setUser(() => ({
                isLoading: false,
                isAuthenticated: false,
                account: {}
            }));
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}

        </UserContext.Provider>

    );
}

export { UserContext, UserProvider }