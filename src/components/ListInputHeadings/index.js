import styled from "styled-components";


const Cont = styled.div`
    width:913px;
    height: 15px;
    display:flex;
    justify-content: space-around;
`;
const Text = styled.p`
    font-size: 12px;
    font-weight: 500;
`;

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
    </Cont>
}