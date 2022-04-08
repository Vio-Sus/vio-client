import styled from "styled-components";


const Cont = styled.div`
    width:1200px;
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

export default function ContactInputHeadings({
    // text = 'button',
    onClick = () => {},
}){

    return<Cont>
        <Text 
        // onClick={onClick}>{text}</Text>
        onClick={onClick}>NAME</Text>
        <Text>TYPE</Text>
        <Text>PHONE NUMBER</Text>
        <Text>ADDRESS</Text>
        <Text>EMAIL</Text>
        <Text>NOTES</Text>
        <Div></Div>
    </Cont>
}