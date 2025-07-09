import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

export default function ReservationApp() {
  const [lang, setLang] = useState('en'); // ✅ default to English
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', datetimeId: '', memo: '' });
  const [message, setMessage] = useState('');
  const [adminSlots, setAdminSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ title: '', date: '', time: '', description: '', imageUrl: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPw, setAdminPw] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmedName, setConfirmedName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false); // ✅ 예약 폼 보여줄지 여부

  useEffect(() => {
    const savedSlots = localStorage.getItem('adminSlots');
    if (savedSlots) setAdminSlots(JSON.parse(savedSlots));
    const savedReservations = localStorage.getItem('reservations');
    if (savedReservations) setReservations(JSON.parse(savedReservations));
  }, []);

  useEffect(() => {
    localStorage.setItem('adminSlots', JSON.stringify(adminSlots));
  }, [adminSlots]);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const text = {
    ko: {
      title: adminAuth ? '관리자 슬롯 설정' : '📅 워크숍 예약 시스템',
      name: '이름',
      email: '이메일',
      memo: '메모 (선택사항)',
      submit: '예약하기',
      success: name => `✅ ${name}님의 예약이 완료되었습니다!`,
      error: '모든 항목을 입력해주세요.',
      full: '정원이 가득 찼습니다. 다른 시간을 선택해주세요.',
      slotConfig: '슬롯 추가',
      slotList: '📅 예약 가능한 워크숍',
      delete: '삭제',
      login: '관리자 로그인',
      close: '닫기',
      viewDetail: '상세 보기',
      reserveNow: '지금 예약하기'
    },
    en: {
      title: adminAuth ? 'Admin Slot Management' : '📅 Workshop Reservation System',
      name: 'Name',
      email: 'Email',
      memo: 'Memo (optional)',
      submit: 'Reserve',
      success: name => `✅ ${name}, your reservation is complete!`,
      error: 'Please fill in all fields.',
      full: 'This time slot is full. Please choose another.',
      slotConfig: 'Add Slot',
      slotList: '📅 Available Workshops',
      delete: 'Delete',
      login: 'Admin Login',
      close: 'Close',
      viewDetail: 'View Details',
      reserveNow: 'Reserve This Workshop'
    }
  };

  const t = text[lang];
  const MAX_CAPACITY = 3;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, datetimeId } = form;
    if (!name || !email || !datetimeId) {
      setMessage(<p className="text-red-600">{t.error}</p>);
      return;
    }
    const count = reservations.filter(r => r.datetimeId === datetimeId).length;
    if (count >= MAX_CAPACITY) {
      setMessage(<p className="text-red-600">{t.full}</p>);
      return;
    }
    setReservations([...reservations, form]);
    setConfirmedName(name);
    setShowModal(false);
    setShowForm(false);
    setForm({ name: '', email: '', datetimeId: '', memo: '' });
    setMessage(<p className="text-green-600">{t.success(name)}</p>);
  };

  const handleSlotAdd = () => {
    if (newSlot.title && newSlot.date && newSlot.time) {
      const id = `${newSlot.date} ${newSlot.time}`;
      const exists = adminSlots.some(slot => slot.date === newSlot.date && slot.time === newSlot.time);
      if (!exists) {
        setAdminSlots([...adminSlots, { ...newSlot, id }]);
      }
      setNewSlot({ title: '', date: '', time: '', description: '', imageUrl: '' });
    }
  };

  const handleSlotDelete = (index) => {
    const updated = [...adminSlots];
    updated.splice(index, 1);
    setAdminSlots(updated);
  };

  const handleAdminLogin = () => {
    if (adminPw === '3931') {
      setAdminAuth(true);
      setAdminPw('');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleViewDetails = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    setConfirmedName('');
  };

  const handleReserveNow = () => {
    setForm({ ...form, datetimeId: selectedSlot.id });
    setShowModal(false);
    setShowForm(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="text-blue-600 text-sm">🌐 {lang === 'ko' ? 'EN' : 'KO'}</button>
        <button onClick={() => {
          if (isAdmin && adminAuth) setAdminAuth(false);
          setIsAdmin(!isAdmin);
          setShowForm(false);
        }} className="text-gray-600 text-sm">{isAdmin ? '👤 User Mode' : '🔧 Admin Mode'}</button>
      </div>

      {showModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-2">{selectedSlot.title}</h2>
            <p className="text-sm text-gray-600">📅 {selectedSlot.date} {selectedSlot.time}</p>
            <p className="my-2 whitespace-pre-line">{selectedSlot.description}</p>
            {selectedSlot.imageUrl && <img src={selectedSlot.imageUrl} alt="preview" className="w-full object-cover rounded" />}
            <button onClick={handleReserveNow} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">{t.reserveNow}</button>
            <button onClick={() => setShowModal(false)} className="mt-2 text-gray-500 w-full">{t.close}</button>
          </div>
        </div>
      )}

      {isAdmin && adminAuth && (
        <div className="space-y-4">
          <input type="text" placeholder="Title" value={newSlot.title} onChange={e => setNewSlot({ ...newSlot, title: e.target.value })} className="w-full p-2 border rounded" />
          <input type="date" value={newSlot.date} onChange={e => setNewSlot({ ...newSlot, date: e.target.value })} className="w-full p-2 border rounded" />
          <input type="time" value={newSlot.time} onChange={e => setNewSlot({ ...newSlot, time: e.target.value })} className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={newSlot.description} onChange={e => setNewSlot({ ...newSlot, description: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Image URL (optional)" value={newSlot.imageUrl} onChange={e => setNewSlot({ ...newSlot, imageUrl: e.target.value })} className="w-full p-2 border rounded" />
          <button onClick={handleSlotAdd} className="w-full bg-green-600 text-white py-2 rounded">{t.slotConfig}</button>
          <div>
            <h2 className="text-lg font-semibold">{t.slotList}</h2>
            {adminSlots.map((slot, i) => (
              <div key={i} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{slot.title}</p>
                  <p className="text-sm text-gray-500">{slot.date} {slot.time}</p>
                </div>
                <button onClick={() => handleSlotDelete(i)} className="text-red-600 text-sm">{t.delete}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAdmin && !adminAuth && (
        <div className="mt-6 space-y-2">
          <input type="password" placeholder="Admin password" value={adminPw} onChange={e => setAdminPw(e.target.value)} className="w-full p-2 border rounded" />
          <button onClick={handleAdminLogin} className="w-full bg-gray-800 text-white py-2 rounded">{t.login}</button>
        </div>
      )}

      {!isAdmin && (
        <>
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">{t.slotList}</h2>
            {adminSlots.map((slot, i) => (
              <div key={i} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{slot.title}</p>
                  <p className="text-sm text-gray-500">{slot.date} {slot.time}</p>
                </div>
                <button onClick={() => handleViewDetails(slot)} className="text-blue-600 text-sm">{t.viewDetail}</button>
              </div>
            ))}
          </div>

          {showForm && (
            <div className="mt-6 space-y-4">
              <input type="text" name="name" placeholder={t.name} value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder={t.email} value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
              <textarea name="memo" placeholder={t.memo} value={form.memo} onChange={handleChange} className="w-full p-2 border rounded" />
              <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded">{t.submit}</button>
              {message && <div className="mt-2">{message}</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
