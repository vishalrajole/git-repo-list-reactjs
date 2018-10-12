import React, { Component } from 'react';
import { styled } from 'styled-components';

const Repo = ({ repo: { name, language, html_url, created_at, description } }) => {
    return (
        <React.Fragment>
            <li>
                <div>Name: {name}</div>
                {language && <div>Language: {language}</div>}
                {html_url && <div>HTML_Url: {html_url}</div>}
                {created_at && <div>Created At: {created_at}</div>}
                {description && <div>Description: {description}</div>}
            </li>
        </React.Fragment>
    )
}
export default Repo;
