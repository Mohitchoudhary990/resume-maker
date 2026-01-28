import { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [currentResume, setCurrentResume] = useState(null);
    const [resumes, setResumes] = useState([]);

    const value = {
        currentResume,
        setCurrentResume,
        resumes,
        setResumes
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};
