import React from 'react';
import { Card, Table } from 'react-bootstrap'
import { useAuthContext } from '../context/AuthContext';

const SongDisplay = function ({ selectedSong }) {

  const { authUser } = useAuthContext();

  return (
    <div>
      <Card.Title className="mb-4">
        Current song: <span className="text-capitalize">{selectedSong.name}</span>
      </Card.Title>
      <Table>
        <tbody>
          {selectedSong.raw.map((line, lineIndex) => (
            <tr>
              {line.map((part, partIndex) => (
                <td className="align-bottom m-0">
                  <Table className="nested m-0">
                    <tbody>
                      <tr>
                        <td className={authUser.musicalRole === "Vocalist" ? "d-none" : "text-start"}>
                          <strong className="align-bottom text-success">
                            {part.chords}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-bottom m-0">
                          {part.lyrics}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SongDisplay