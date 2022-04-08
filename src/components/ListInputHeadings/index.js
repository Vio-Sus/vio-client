import styled from "styled-components";


const Cont = styled.div`
    width:90vw;
    height: 15px;
    display:flex;
    align-items: center;
`;
const Text = styled.p`
    display: flex;
    justify-content:center;
    flex:1;
    font-size: 12px;
    font-weight: 500;
`;

const Div = styled.div`
    display: flex;
    flex:1;
`

export default function ListInputHeadings({
    // text = 'button',
    onClick = () => {},
}){

    return<Cont>
        <Text 
        // onClick={onClick}>{text}</Text>
        onClick={onClick}>SUBACCOUNTS</Text>
        <Text>PROCESSOR</Text>
        <Text>DATE</Text>
        <Text>MATERIALS</Text>
        <Text>TOTAL WEIGHT</Text>
        <Text>STATUS</Text>
        <Div></Div>
    </Cont>
}