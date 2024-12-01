import React, { useEffect, useState } from 'react';

function Results() {
    const [status, setStatus] = useState(null);
    const [results, setResults] = useState(null);
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        // Fetch election status
        fetch('http://localhost:5000/voting/status')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setStatus(data.data);
                    if (data.data.ended) {
                        // Fetch election results
                        fetch('http://localhost:5000/voting/results')
                            .then(response => response.json())
                            .then(resultData => {
                                if (resultData.success) {
                                    setResults(resultData.data);
                                } else {
                                    setMessage('Unable to fetch results.');
                                }
                            })
                            .catch(err => {
                                console.error('Error fetching results:', err);
                                setMessage('Error fetching results.');
                            });
                    } else {
                        setMessage('Election is still ongoing. Results will be available once the election ends.');
                    }
                } else {
                    setMessage('Unable to fetch election status.');
                }
            })
            .catch(err => {
                console.error('Error fetching status:', err);
                setMessage('Error fetching election status.');
            });
    }, []);

    if (results) {
        return (
  <div
    style={{
      textAlign: 'center',
      marginTop: '50px',
      backgroundColor: '#f9f9f9',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}
  >
    <h2
      style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px'
      }}
    >
      Election Results
    </h2>
    <p
      style={{
        fontSize: '24px',
        marginBottom: '20px'
      }}
    >
      Trump: {results.redVotes}
    </p>
    <p
      style={{
        fontSize: '24px',
        marginBottom: '20px'
      }}
    >
      Kamala: {results.blueVotes}
    </p>
    <p
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '40px'
      }}
    >
      Winner:{" "}
      <span style={{ color: 'green' }}>
        {(results.redVotes > results.blueVotes) ? "Trump" : ((results.redVotes && results.blueVotes) == 0) ? "No votes casted!" : (results.redVotes == results.blueVotes) ? "Votes are tied!": "Kamala"}
      </span>
    </p>
  </div>
);

    } else {
        return <div>{message}</div>;
    }
}

export default Results;
