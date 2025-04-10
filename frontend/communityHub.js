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

            setPetitions((prevPetitions) => [...prevPetitions, newPetition]);
        } catch (error) {
            console.error('Error creating petition:', error.message);
            alert(`Error: ${error.message}`);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const petitionDetails = {
            full_name: event.target.full_name.value,
            parent_info: event.target.parent_info.value,
            state: event.target.state.value,
            issue: event.target.issue.value,
            title: event.target.title.value,
            category: event.target.category.value,
            target: parseInt(event.target.target.value, 10),
            deadline: event.target.deadline.value,
        };

        createPetition(petitionDetails);
    }

    return (
        <div>
            <h1>Community Hub</h1>
            <form onSubmit={handleSubmit}>
                <input name="full_name" placeholder="Full Name" required />
                <input name="parent_info" placeholder="Parent Info" required />
                <input name="state" placeholder="State" required />
                <input name="issue" placeholder="Issue" required />
                <input name="title" placeholder="Title" required />
                <input name="category" placeholder="Category" required />
                <input name="target" type="number" placeholder="Target" required />
                <input name="deadline" type="date" placeholder="Deadline" required />
                <button type="submit">Create Petition</button>
            </form>
            <ul>
                {petitions.map((petition, index) => (
                    <li key={index}>{petition.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default CommunityHub;