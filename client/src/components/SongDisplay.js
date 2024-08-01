import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const SongDisplay = function ({ selectedSong }) {

  const { authUser } = useAuthContext();

  return (
      <table>
        <tbody>
          {selectedSong.raw.map((line, lineIndex) => (
            <tr key={lineIndex}>
              {line.map((part, partIndex) => (
                <td key={partIndex}>
                  <table className="nested">
                    <tbody>
                      {(authUser.musicalRole==="Vocalist")?"":<tr><td><strong>{part.chords}</strong></td></tr>}
                      <tr><td>{part.lyrics}</td></tr>
                    </tbody>
                  </table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default SongDisplay