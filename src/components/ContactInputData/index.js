import React, {useState, useEffect } from 'react'
import { getSources } from '../../common/network';
import styled from "styled-components";
import { Checkbox } from 'semantic-ui-react'
import ContactInputHeadings from '../ContactInputHeadings';

const Cont = styled.div`
display:flex;
flex-direction: row;
background-color:${props=>props.bgcolor};
height: 66px;
width:1208px;
`
//name
const UniqueCont = styled.div`
display:flex;
flex-direction: row;
flex:1;
justify-content:center;
align-items:center;
`

const UniqueContLeft = styled.div`
    display:flex;
    flex:1;
    align-items:center;
    justify-content:center;
`

const UniqueContRight = styled.div`
display:flex;
flex-direction: column;
flex:2;
align-items:center;
`

const Name = styled.div`
font-size: 14px;
color: #2E3B52;
`
const Number = styled.div`
color:#606F89;
font-size:12px;
`

//type 
const TypeCont = styled.div`
    display:flex;
    flex-direction: row;
    flex:1;
    justify-content:center;
    align-items:center;
`

const Type = styled.div`
font-size: 14px;
color: #2E3B52;
`

//phone number
const NumberCont = styled.div`
display:flex;
flex-direction: row;
flex:1;
justify-content:center;
align-items:center;
`

const PNumber = styled.text`
font-size: 14px;
color: #2E3B52;
`

//address
const AddressCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
`

const Address = styled.div`
font-size: 14px;
color: #2E3B52;
`

//email
const EmailCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
`
const Email = styled.div`
font-size: 14px;
color: #2E3B52;
`

//notes
const NotesCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
`

const Notes = styled.div`
font-size: 14px;
color: #2E3B52;
`

//edit
const EditCont = styled.div`
    display:flex;
    flex-direction: row;
    flex:1;
    justify-content: space-evenly;
    align-items: center;
`

const EditIcon = styled.img`
    width: 20px;
    height: 20px;
`
const DeleteIcon = styled.img`
    width: 20px;
    height: 20px;
`

const ContactInputData = ({
    bgcolor="#ECFAEE",
    name = "Processor 1",
    type = "PROCESSOR",
    number = "5684236583",
    phonenumber = "123-456-7890",
    address = "590 Circle Road, Stony Brook NY",
    email = "processor@vio.com",
    notes = "don’t like mixed wastes",
    editSrc = "/edit.svg",
    deleteSrc = "/delete.svg",
    onClickEdit = () => {},
    onClickDelete = () => {},

}) => {
    const [sources, setSources] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            let [sources] = await Promise.all([getSources()]); // returns new promise with all data
            setSources(sources || []);
          } catch {}
        })();
      }, []);
    return <Cont bgcolor={bgcolor}>
        
        <UniqueCont>
            <UniqueContLeft>
                <Checkbox />
            </UniqueContLeft>
            <UniqueContRight>
                <Name>{name}</Name>
                <Number>{number}</Number>
            </UniqueContRight>
        </UniqueCont>

        <TypeCont>
            <Type>{type}</Type>
        </TypeCont>

        <NumberCont>
            <PNumber>{phonenumber}</PNumber>
        </NumberCont>

        <AddressCont>
            <Address>{address}</Address>
        </AddressCont>

        <EmailCont>
            <Email>{email}</Email>
        </EmailCont>

        <NotesCont>
            <Notes>{notes}</Notes>
        </NotesCont>

        <EditCont>
                <EditIcon onClick={ onClickEdit } src={editSrc}></EditIcon>
                <DeleteIcon onClick={ onClickDelete } src={deleteSrc}></DeleteIcon>
        </EditCont>
        
    </Cont>
}


export default ContactInputData

