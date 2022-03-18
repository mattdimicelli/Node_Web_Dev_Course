import fetch from 'node-fetch';


function speakerService() {
    const getSpeakerById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/speakers/${id}`);
            let data = await response.json();
            return data;
        }
        catch(err) {
            console.error(err);
        } 
    }

    return ({ getSpeakerById });
}

export default speakerService;
