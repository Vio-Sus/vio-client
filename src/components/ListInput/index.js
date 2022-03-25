import React from 'react'
import styled from "styled-components";
import { Checkbox } from 'semantic-ui-react'
import ItemStatus from '../ItemStatus';

const Cont = styled.div`
display:flex;
flex-direction: row;
background-color:${props=>props.bgcolor};
height: 66px;
width:100vw;
`
//subaccounts
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

const SubAccount = styled.div`
font-size: 14px;
color: #2E3B52;
`
const Number = styled.div`
color:#606F89;
font-size:12px;
`

//processor 
const ProcessorCont = styled.div`
    display:flex;
    flex-direction: row;
    flex:1;
    justify-content:center;
    align-items:center;
`

const Processor = styled.div`
font-size: 14px;
color: #2E3B52;
`

//date
const DateCont = styled.div`
display:flex;
flex-direction: row;
flex:1;
justify-content:center;
align-items:center;
`

const Date = styled.text`
font-size: 14px;
color: #2E3B52;
`

//materials
const MaterialCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
`
const WrapMaterialCont = styled.div`
display:flex;
flex-direction: column;
flex:2;
align-items:center;
justify-content:center;
`

const Material = styled.div`
font-size: 14px;
color: #2E3B52;
`
const MoreMaterials = styled.div`
color:#606F89;
font-size:12px;
`

//total weight
const WeightCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
`
const Weight = styled.div`
font-size: 14px;
color: #2E3B52;
`

//item status cont
const ItemStatusCont = styled.div`
display:flex;
flex-direction: column;
flex:1;
align-items:center;
justify-content:space-around;
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


const ListInput = ({
    bgcolor="#ECFAEE",
    subaccount = "Vio Coffee Shop",
    processor = "P1",
    uniquenumber = "5684236583",
    date = "April 23, 2022",
    material = "Coffee Cups",
    morematerials="+2 materials",
    totalweight = "369.23kg",
    editSrc = "/edit.svg",
    deleteSrc = "/delete.svg",
    onClickEdit = () => {},
    onClickDelete = () => {},

}) => {
    return <Cont bgcolor={bgcolor}>
        <UniqueCont>
            <UniqueContLeft>
                <Checkbox />
            </UniqueContLeft>
            <UniqueContRight>
                <SubAccount>{subaccount}</SubAccount>
                <Number>{uniquenumber}</Number>
            </UniqueContRight>
        </UniqueCont>

        <ProcessorCont>
            <Processor>{processor}</Processor>
        </ProcessorCont>

        <DateCont>
            <Date>{date}</Date>
        </DateCont>

        <MaterialCont>
            <WrapMaterialCont>
            <Material>{material}</Material>
            <MoreMaterials>{morematerials}</MoreMaterials>
            </WrapMaterialCont>
        </MaterialCont>

        <WeightCont>
            <Weight>{totalweight}</Weight>
        </WeightCont>

        <ItemStatusCont>
            <ItemStatus />
        </ItemStatusCont>

        <EditCont>
                <EditIcon onClick={ onClickEdit } src={editSrc}></EditIcon>
                <DeleteIcon onClick={ onClickDelete } src={deleteSrc}></DeleteIcon>
        </EditCont>
        
    </Cont>
}


export default ListInput

