import React, { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note'
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'tr-TR'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
    console.log(savedNotes)
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
  const handleDelete = (n) => {
      // const id = savedNotes.indexOf(n);
      // console.log(n + id )
      // console.log(savedNotes.filter(item => item !== n))
      setSavedNotes(savedNotes.filter(item => item !== n))
  }

  return (
    <>
      <h1>Sesli Notlar</h1>
      <div className="container">
        <div className="mainWrapper">
          <div className="box-1 box">
            <div className='box-title'>
              <h2>Not Oluştur</h2>
              <div>
                {isListening 
                  ? 
                  <button 
                    onClick={() => setIsListening(prevState => !prevState)} 
                    id='speech' 
                    className='btn type2'
                  >
                    <div className='pulse-ring'></div>
                    <i className="fa fa-microphone" aria-hidden="true"></i>
                  </button>
                  :
                  <button 
                  onClick={() => setIsListening(prevState => !prevState)} 
                  id='speech' 
                  className='btn'
                  >
                    <i className="fa fa-microphone" aria-hidden="true"></i>
                  </button>
                }
                <button onClick={handleSaveNote} disabled={!note}>
                  Notunu Kaydet
                </button>
              </div>
            </div>
            <p>{note}</p>
          </div>
          <div className="box">
            <h2>Notlarım</h2>
            {savedNotes.map(n => (
              <Note key={n}>
                <div className='note-box'>
                  <p>{n}</p>
                  <button className='note-box-button' onClick={() => { handleDelete(n) }}>
                    <i class="fas fa-times-circle"></i>
                  </button>
                </div>
              </Note>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
