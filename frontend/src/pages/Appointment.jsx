import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import {doctors} from "../assets/assets"

const Appointment = () => {

  const {docId} = useParams();
  // get all doctors from backend

  const [docInfo, setDocInfo] = useState(null);

  // fetchDocInfo
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc.id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    <div>Appointment</div>
  )
}

export default Appointment