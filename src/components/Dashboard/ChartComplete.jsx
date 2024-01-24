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
        try {
            const response = await axios.get(api + 'IssueAPI/ChartComplete');
            const resultData = response.data.result;

            // รวมค่า completeSt และ cntStatus ทั้งหมด
            const sumData = resultData.reduce((accumulator, currentValue) => {
                return {
                    completeSt: accumulator.completeSt + currentValue.completeSt,
                    cntStatus: accumulator.cntStatus + currentValue.cntStatus
                };
            }, { completeSt: 0, cntStatus: 0 });

            // นำผลรวมไปกำหนดค่าให้กับ state หรือทำอย่างอื่นต่อไปได้ตามต้องการ
            setDataComplete(sumData);

        } catch (error) {
            console.error(error);
        }
    }, [api]);
    console.log(dataComplete.cntStatus);
    useEffect(() => {
        chartData();
    }, [chartData]);

    const data = [
        { id: 0, value: dataComplete.completeSt, label: 'Complete' },
        { id: 1, value: dataComplete.cntStatus, label: 'แจ้งปัญหา' },
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