import React, { useState } from 'react';

function CommunityHub() {
    const [petitions, setPetitions] = useState([]);

    async function createPetition(petitionDetails) {
        try {
            const response = await fetch('/api/petitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(petitionDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create petition');
            }

            const newPetition = await response.json();
            setPetitions((prevPetitions) => [...prevPetitions, { ...newPetition, status: 'active' }]);
        } catch (error) {
            console.error('Error creating petition:', error.message);
            alert(`Error: ${error.message}`);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const petitionDetails = {
            title: event.target.title.value,
            issue: event.target.issue.value,
            category: event.target.category.value,
            target: parseInt(event.target.target.value, 10),
            deadline: parseInt(event.target.deadline.value, 10),
        };

        createPetition(petitionDetails);
    }

    function updatePetitionStatus() {
        setPetitions((prevPetitions) =>
            prevPetitions.map((petition) =>
                petition.signatures >= petition.target
                    ? { ...petition, status: 'completed' }
                    : petition
            )
        );
    }

    return (
        <div>
            <h1>Community Hub</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Petition Title" required />
                <textarea name="issue" placeholder="Issue Description" required />
                <input name="category" placeholder="Category" required />
                <input name="target" type="number" placeholder="Target Signatures" required />
                <input name="deadline" type="number" placeholder="Deadline (Days)" required />
                <button type="submit">Create Petition</button>
            </form>
            <ul>
                {petitions.map((petition, index) => (
                    <li key={index}>
                        {petition.title} - {petition.status}
                    </li>
                ))}
            </ul>
            <button onClick={updatePetitionStatus}>Update Petition Status</button>
        </div>
    );
}

export default CommunityHub;