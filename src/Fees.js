import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Fees.css';

function Fees() {
    const [fees, setFees] = useState({ slow: '', standard: '', fast: '' });

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bitcoin/fees');
                setFees(response.data);
            } catch (error) {
                console.error('Error fetching fees:', error);
            }
        };

        fetchFees();
    }, []);

    return (
        <div className="fees">
            <label>RECOMMENDED FEES PER BYTE</label>
            <div className="fee-item">
              <span className="fee-label">Slow:</span>
              <span className="fee-text">{fees.slow} BTC</span>
            </div>
            <div className="fee-item">
              <span className="fee-label">Standard:</span>
              <span className="fee-text">{fees.standard} BTC</span>
            </div>
            <div className="fee-item">
              <span className="fee-label">Fast:</span>
              <span className="fee-text">{fees.fast} BTC</span>
            </div>
        </div>
    );
}

export default Fees;
