

import React, { useEffect } from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, PolarArea } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js';
import { useSelector } from 'react-redux';
import { loadToys } from '../../store/actions/toy.action.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const toyLabels = toyService.getToyLabels()

export function DashBoard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])
    let prices = []
    for (var i = 0; i < toyLabels.length; i++) {
        const count = toyService.mapLabels(toyLabels[i], toys)
        prices.push(count)
    }
    let percentage = []
    for (var i = 0; i < toyLabels.length; i++) {
        const count = toyService.precentefStockByLabel(toyLabels[i], toys)
        percentage.push(count)
    }
    const dataPrices = {
        labels: toyLabels,
        datasets: [
            {
                label: 'prices per label',
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const dataStock = {
        labels: toyLabels,
        datasets: [
            {
                label: ' percentage of toys that are in stock %',
                data: percentage,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <h1>Prices per label</h1>
            <Pie data={dataPrices} />
            <PolarArea data={dataStock} />
            {/* <PolarArea data={data} /> */}
        </>)
}