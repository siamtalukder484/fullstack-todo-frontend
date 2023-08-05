import axios from 'axios';
import React, { useEffect,useState } from 'react'

const GithubCon = () => {
    const [contributions, setContributions] = useState([]);
    

    useEffect(() => {
        const fetchGitHubData = async () => {
          try {
            const response = await axios.get('https://api.github.com/users/siamtalukder484/contributions',{
                headers: {
                  Authorization: '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'
                }
              }
            );
            setContributions(response.data);
          } catch (error) {
            console.error('Error fetching GitHub data:', error);
          }
        };
    
        fetchGitHubData();
      }, []);
      console.log(contributions);


  return (
    <div>GithubCon</div>
  )
}

export default GithubCon