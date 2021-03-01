# 맥북 컨셉의 Todo app

## 구현된 주요 기능

### 1. 뮤직 플레이어

<image src="./image/readme/audio2.gif" />

사이드바에 있는 플레이어는 음악 재생이 가능합니다. 총 2곡을 담아보았습니다. 규현-광화문에서와 아이유-celebrity입니다.

1.  재생 및 멈춤

    재생 여부에 따라 boolean값을 반환하는 audio의 paused property에 맞게 `audio.play()` 및 `audio.pause`를 실행

2.  다음곡 이동

    총 2곡 뿐이기 때문에 간단하게 아래와 같이 각 music에 id를 0과 1로 할당해주고 next 버튼이 눌리면 1에서 현재 id값을 빼주어 다음곡을 불러오는 방식을 사용

    _ex) 1-1 = 0, 1-0 = 1_
    <image src='./image/readme/audio1.png' />

3.  현재 재생 위치 표시 및 재생 위치 변경

    현재 재생 위치를 표현하기 위해 audio의 currentTime property와 duration property 그리고 css의 background에 linear-gradient를 적극 활용.

    ```javascript
    const value = Math.floor((audio.currentTime / audio.duration) * 100);
    this.style.background = `linear-gradient( to right, white 0%, white ${value}%, #545454 ${value}%, #545454 100%)`;
    ```

4.  볼륨 조절

    audio의 volume property를 사용하여 volume 조절 기능 구현

### 2. Todo

<image src="./image/readme/todo1.gif" />
1. data 저장 및 CRUD

- 사용자가 페이지를 떠나도 작성해둔 todo data를 저장해놓기 위해 `localStorage`에 todo item을 배열에 넣어 저장

- Update나 Delete 시에 정확히 원하는 item을 가리키기 위해 각 item마다 id를 부여해야 했는데 간단하게 ms까지 구분되는 `Date.now()`를 사용. 혹시 모를 상황에 대비해 `Math.random()*100`까지 더해주어 item끼리 id가 의도치 않은 상황이 발생할 경우의 수를 매우 작게 줄임.

2. drag & drop

   drag and drop 기능을 적용하기 위해 drag and drop api를 사용. 먼저 drag and drop api를 적용하기 위한 과정은 다음과 같다.

   - 1. 이동하고자 하는 element의 draggable property를 true로 해준다.
   - 2. element에 dragstart event 에 대한 listener를 달아주고 해당 event 발생시 실행될 콜백함수에서 ` ev.dataTransfer.setData(<key>, <value>)` 를 통해 옮기고자 하는 value를 저장한다.
   - 3. drag된 item이 drop될 element에는 drop evnet에 대한 listener를 달아주고 해당 event 발생시 실행될 콜백함수에서 `const value = ev.dataTransfer.getData(<key>");`원하는 value를 받아와 원하는 동작을 처리해주면 된다.
   - 4. 추가로 dragover event를 활용하면 현재 drag되고 있는 element가 움직이는 것을 감지할 수 있는데 이것을 사용하여 좀더 자연스러운 drag&drop 구현이 가능하다.

### 3. 날씨 앱

<image src="./image/readme/weather1.png" />

1. 날씨 받아오기

   - openWeathermap 의 one call api를 사용하면 날짜별 시간별 날씨를 한번에 받아올 수 있음

   - openWeathermap docs를 보면 날씨를 얻기 위해 원하는 지역의 경도와 위도를 필요로 하는데 이것은 geolocation api를 사용하여 획득.
     `const watchID = navigator.geolocation.getCurrentPosition(success, error, options)`
     해당 코드를 실행시키면 위치 정보를 허용할지에 대한 팝업이 사용자에게 표시되는데 사용자가 허용을 클릭하면 success 콜백함수가 실행되고 그렇지 않으면 error 콜백함수가 실행 됨. success 콜백함수 실행시 position값을 받아올 수 있고 position값에 담긴 latitude와 longitude값을 openweathermap api에 전달할 수 있음.

2. 사용자의 편의를 위한 위치 데이터 저장

   사용자에게 매번 위치 데이터를 묻는 것은 사용자 편의성이 떨어지는데 이것을 해결하기 위한 두가지 방법이 있다.

   - localStorage 사용

     사용자의 위치를 한번 받으면 localStorage에 저장해두었다가 다음 요청에 저장된 위치를 기반으로 날씨를 받아올 수 있다. 단점으로 저장 시간이 오래되면 위치가 변했을 확률이 높기 때문에 최선은 아니라고 할 수 있다.

   - geolocation api의 positionOptions 객체 사용

     options로 전달할 객체에 ms로 위치에 대한 유효 시간을 전달하면 이 시간 동안에 동일한 요청이 들어오면 같은 값을 반환.

### 4. 굿노트 앱

<image src="./image/readme/paint1.gif" />
아이패드에서 많이 사용되는 굿노트 앱에서 영감을 받아 추가한 기능. canvas API를 이용해 구현하였습니다.

1. canvas 태그의 비율에 대한 이해

   canvas 태그의 높이 및 폭을 잘못 설정하면 비율이 달라서 의도와 다른 결과를 볼 수 있다.
   이 비율을 맞추는 두 가지 방법이 있다.

   - canvas 속성에서 width와 height를 설정해주고 이 값과 동일하게 css에서도 설정해주면 비율이 뒤틀리는 일은 없다. 다만 같은 값을 두번 작업해주어야 하므로 실수가 발생할 수도 있고 번거롭다.
   - canvas 속성에서 width와 height를 설정해주고 javascript를 이용해 canvas element에 대한 width와 height attribute를 받아와 style을 정해준다. 크게보면 위의 방법과 동일하지만 canvas 속성에 한번만 작업을 해주면 된다는 장점이 있다.

2. 펜 기능 및 색상, 두께 설정 기능

   canvas에 마우스 `mousedown`, `mouseup`, `mousemove`, `mouseleave`, event에 대한 listener를 달아주어 mouse에 반응하도록 함. `mousedown` event가 발생하면 `e.offSetX`와 `e.offSetY`를 통해 마우스의 위치를 받아 오고 받아온 위치를 이용해 아래와 같이 그림을 그리는 듯한 효과를 줌.

   - begin 함수

     `mousedown` event 발생시 실행되는 콜백함수 중 일부

   - draw 함수

     `mousemove` event 발생시 실행되는 콜백함수 중 일부

   ```javascript
   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext("2d");

   const begin = (x, y) => {
     ctx.beginPath();
     ctx.moveTo(x, y);
   };

   const draw = (x, y) => {
     ctx.lineTo(x, y);
     ctx.stroke();
   };
   ```

   - 색상

     `ctx.strokeStyle = color`를 이용

   - 두께

     `ctx.lineWidth = lineWidth`를 이용

3. 초기화 및 지우개 기능(pointer)

   전체적으로 초기화와 지우개 모두 `clearRect()`가 사용되었습니다.

   - 초기화

     `clearRect`에 시작 사각형의 왼쪽 상단 점을 기준으로 폭과 너비를 전달하면 그 범위를 모두 지워줍니다. 따라서 초기화를 위해선 캔버스의 왼쪽 상단 점(0,0), canvas의 width 그리고 canvas의 height를 전달해주면 전체 화면 초기화의 효과를 얻을 수 있습니다.

   - 지우개 기능

     지우개 기능을 구현하기 위해 펜 기능과 동일하게 `e.offSetX`와 `e.offSetY`를 받아와 이용하면 되며 `clearRect`를 이용하였습니다. 현재 mouse가 위치한 x와 y의 위치를 알고 있으므로 현재 위치를 기준으로 원하는 범위의 절반만큼 x와 y에서 빼준 후 그 위치를 시작 위치로 전달하고 원하는 범위를 width와 height값으로 전달해줍니다. 이렇게 하면 마우스가 중심이 되는 사각형만큼을 지워줍니다.

   - 지우개 pointer

     지우개의 pointer가 없으면 상당히 불편해서 pointer를 넣어주었습니다. css `position: absolute`의 element가 마우스 위치를 따라다니도록 해주었고 지우는 동안에만 `opacity: 1`을 주어 pointer가 보이도록 하였습니다.
