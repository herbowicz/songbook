import React from "react";
import styled from "styled-components";
import { space } from "../style_abstract/variables";

export const H1 = styled.h1`
    font-weight: 700;
    font-size: ${space.s4};
    line-height: 20px;
`;

const Logo = props => {
    return !props.display ? (
        <H1 className={`logo`}>
            <a href="/">
                Song
                <br />
                Book
            </a>
        </H1>
    ) : (
        ""
    );
};

export default Logo;
