import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// const [options, setOptions] = useState([]); // 동적으로 변경할 options 상태

//   const handleInputChange = async (event, value) => {
//     if (value) {
//       // 여기서 API를 호출하여 options를 업데이트합니다.
//       const response = await fetch(`YOUR_API_ENDPOINT?query=${value}`);
//       const data = await response.json();

//       // 데이터가 어떻게 구성되는지에 따라 아래와 같이 옵션 배열을 설정
//       const newOptions = data.map(item => ({
//         label: item.title, // API 응답에 맞게 label 설정
//         id: item.id
//       }));

//       setOptions(newOptions); // 상태 업데이트
//     } else {
//       setOptions([]); // 입력값이 없으면 옵션 초기화
//     }
//   };

  const options = ['The Godfather', 'Pulp Fiction'];
 const SearchBox = (props) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      onChange={(event, value) => props.onchange(value)}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

export default SearchBox;