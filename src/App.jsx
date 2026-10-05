import React, {useEffect, useState} from 'react';
import {pages} from './pages';
import './style.css';

const getPageFromUrl = () => {
  const hash = window.location.hash.replace('#','');
  if (!hash) return '/home.html';
  const found = pages.find(p => p.name === hash || p.path === '/' + hash);
  return found?.path || '/home.html';
};

export default function App(){
  const [page,setPage]=useState(getPageFromUrl());

  useEffect(()=>{
    const onHash=()=>setPage(getPageFromUrl());
    window.addEventListener('hashchange',onHash);
    return ()=>window.removeEventListener('hashchange',onHash);
  },[]);

  // The original Home page is rendered directly as the visual surface.
  // This keeps its exact HTML/CSS/JS output instead of recreating it approximately.
  return (
    <main className="app">
      <iframe
        key={page}
        className="original-site"
        src={page}
        title="Meipuratchi"
        allow="fullscreen"
      />
    </main>
  );
}
