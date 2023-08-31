/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import Title from '../Header/Title';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ChartComplete(props) {
    const { api } = props;



    const [dataComplete, setDataComplete] = useState([]);

    const chartData = useCallback(async () => {
        await axios.get(api + 'IssueAPI/ChartComplete')
            .then((response) => {
                setDataComplete(response.data.result);
                console.log(response.data.result);
            }).catch((error) => {
                console.log(error);
            });
    }, [api]);

    useEffect(() => {
        chartData();
    }, [chartData]);
    const completeCount = dataComplete.length > 0 ? dataComplete[0].completeSt : 0;
    const incompleteCount = dataComplete.length > 0 ? dataComplete[0].cntStatus : 0;

    const data = [
        { id: 0, value: completeCount, label: 'Complete' },
        { id: 1, value: incompleteCount, label: 'แจ้งซ่อม' },
    ];
    // const palette = ['red', 'green'];
    return (
        <PieChart
            // colors={palette}
            series={[
                {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                },
            ]}
            sx={{
                [`& .${pieArcClasses.faded}`]: {
                    fill: 'gray',
                },
            }}

        />
    );
}