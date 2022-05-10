import { useEffect, useState } from 'react';
import { dateToYMD } from '../common/date';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EntriesList from '../components/Entry/EntriesList';
import SourceEntriesList from '../components/Entry/SourceEntriesList';
import EditForm from '../components/Entry/EditEntryForm';
import DeleteConfirmation from '../components/Entry/DeleteEntryConfirmation';
import Button from '../components/Button';
import { getSourceGraphDataset } from '../common/network'; //Remove this after testing

const StyledLink = styled(Link)`
    color: none;
    text-decoration: none;
    position: relative;
    `;

    const ViewSourceDataPage = () => {
        const [isEditing, setIsEditing] = useState(false);
        const [selectedEntry, setSelectedEntry] = useState(null);
        const [isDeleting, setIsDeleting] = useState(false);
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
 
        const todayObj = new Date(new Date().toString());
        const todayMinus100 = new Date(new Date().setDate(todayObj.getDate() - 60));
        // sets up dates for date input
        const todayDate = dateToYMD(todayObj);
        const defaultStartDate = dateToYMD(todayMinus100);

        useEffect(() => {
            // why is this wrapped with brackets? doesn't work if they're not there
            (async () => {
                try {
                    await setStartDate(defaultStartDate);
                    await setEndDate(todayDate);

                    const sourceGraphData = await getSourceGraphDataset();
                    console.log(sourceGraphData)

                    console.log('startDate: ', startDate);
                    console.log('endDate: ', endDate);
                } catch (error) {
                    console.log(error)
                }
            })()
        }, []);

        const handlePrint = () => {
            window.print();
        };

        return (
            startDate &&
            endDate && (
                <>
                    <div className="pageCont">
                        <header>
                            <div className="headingCont">
                                <h1>Your Collections</h1>
                                <h3>Here's an overview of your collections.</h3>
                            </div>
                            <div className="buttonCont">
                                <StyledLink to="/viewSourceGraph">
                                    <Button buttontext="Graph View" buttoncolor="#4A4A4A" />
                                </StyledLink>

                                <Button
                                    buttontext="Print"
                                    buttoncolor="#4A4A4A"
                                    onClick={handlePrint}
                                />                             
                            </div>
                        </header>
                        <SourceEntriesList/>

                    </div>
                </>
            )
        )
    };

    export default ViewSourceDataPage;