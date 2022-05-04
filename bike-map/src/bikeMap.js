import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function BikeMap({ interviews }) {
  const markers = [];
  interviews.forEach((interview) => {
    markers.push(
      <Marker
        position={[interview.location.lat, interview.location.lon]}
        key={interview.timestamp}
      >
        <Popup>
          {interview.timestamp} from {interview.location.display_name}
          <br />
          <audio controls>
            <source src={interview.interviewURL} />
          </audio>
        </Popup>
      </Marker>
    );
  });
  let centerPoint = [39.7992113, -102.4653385];
  // TODO: This doesn't work. MapContainer treats its props as immutable.
  // if (interviews.length) {
  //   const lastInterviewLocation = interviews[interviews.length - 1].location;
  //   centerPoint = [
  //     parseFloat(lastInterviewLocation.lat),
  //     parseFloat(lastInterviewLocation.lon),
  //   ];
  // }

  return (
    <MapContainer center={centerPoint} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

export default BikeMap;
