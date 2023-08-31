/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import Title from '../Header/Title';
import { BarChart } from '@mui/x-charts/BarChart';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Chart(props) {
    const { api } = props;
    const [data, setData] = useState([]);

    const chartData = useCallback(async () => {
        await axios.get(api + 'IssueAPI/chart')
            .then((response) => {
                setData(response.data.result);
            }).catch((error) => {
                console.log(error);
            });
    }, [api]);

    useEffect(() => {
        chartData();
    }, [chartData]);

    // console.log(data.map(item => item.status));
    return (
        <>
            {data.length !== 0 && (
                <>
                    <Title>สถานะงาน</Title>
                    <BarChart
                        margin={{
                            top: 10,
                            right: 16,
                            bottom: 20,
                            left: 24,
                        }}
                        xAxis={[
                            {
                                id: 'issues',
                                data: data.map(item => item.status_name),
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: data.map(item => item.count),
                            },
                        ]}
                    />
                </>
            )}
        </>

    );
}