import styled from "styled-components";

const Cont = styled.div`
display:flex;
`

const Status = styled.div`
width: 110px;
height:20px;
background:${props => props.bgcolor};
border-radius:20px;
`

const Text = styled.div`
display:flex;
justify-content:center;
color:#FFFFFF;
margin-top:3.5px;
font-size:10px;
`

const ItemStatus = ({
    text="PICKED UP",
    bgcolor="#F86E6E",
}) => {
    return <Cont>
         {/* top  */}
        <Status bgcolor={bgcolor}>
            <Text>{text}</Text>
        </Status>

    </Cont>
}

export default ItemStatus;