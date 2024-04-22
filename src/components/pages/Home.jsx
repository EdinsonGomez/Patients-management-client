import { useState, useEffect } from 'react';
import HomeTemplate from '@/components/template/Home';
import PatientsTable from '@/components/organims/patientsTable/PatientsTable';
import Modal from '@/components/organims/modal/Modal';
import PatientInfo from '../organims/patientInfo/PatientInfo';
import { useDispatch } from 'react-redux';
import { fetchPatientsList } from '@/store/patientsListSlice';
import { fetchPatientById } from '@/store/patientSlice';
import { fetchUserById } from '@/store/userSlice';

function Home() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const onClickRow = (item) => {
    dispatch(fetchPatientById(item.id));
    setOpenModal(true);
  }

  useEffect(() => {
    dispatch(fetchPatientsList());
    dispatch(fetchUserById(1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeTemplate>
      <PatientsTable onClickRow={onClickRow} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title='Información Paciente'
      >
        <PatientInfo />
      </Modal>
    </HomeTemplate>
  )
}

export default Home