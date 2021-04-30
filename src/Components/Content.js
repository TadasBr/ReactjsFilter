import React from 'react';
import styled from 'styled-components';
import Filter from "./Filter";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: -1;
`

export default function Content () {
    return(
        <Wrapper>
            <Filter/>
        </Wrapper>
    )
}