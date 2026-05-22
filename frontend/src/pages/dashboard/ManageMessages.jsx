import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiMail, FiInbox, FiClock } from 'react-icons/fi';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import { getMessages, markAsRead, deleteMessage } from '../../services/contactService';
import { formatDate } from '../../utils/formatDate';
import toast from 'react-hot-toast';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => getMessages().then(r => setMessages(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const handleRead = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) {
      try { await markAsRead(msg._id); fetchData(); } catch {}
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteMessage(deleteId);
      toast.success('Message deleted');
      setConfirmOpen(false);
      if (selected?._id === deleteId) setSelected(null);
      fetchData();
    } catch { toast.error('Failed to delete'); }
    setSaving(false);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Messages</h1>
          <p className="text-slate-custom text-sm">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="loader-spinner" /></div> : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-slate-custom">
                <FiMail className="text-4xl mx-auto mb-4 opacity-30" />
                <p>No messages yet</p>
              </div>
            ) : messages.map(msg => (
              <div key={msg._id}
                onClick={() => handleRead(msg)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selected?._id === msg._id
                    ? 'bg-emerald/5 border-emerald/20'
                    : msg.isRead ? 'bg-white border-gray-100 hover:bg-gray-50' : 'bg-white border-emerald/20 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && <span className="w-2.5 h-2.5 bg-emerald rounded-full shrink-0" />}
                    <span className={`font-medium text-sm ${msg.isRead ? 'text-slate-custom' : 'text-navy'}`}>{msg.name}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(msg._id); setConfirmOpen(true); }}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                </div>
                <p className="text-navy font-semibold text-sm truncate mb-1">{msg.subject}</p>
                <div className="flex items-center gap-2 text-xs text-slate-custom">
                  <FiClock size={12} /> {formatDate(msg.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-1">{selected.subject}</h2>
                    <div className="flex items-center gap-3 text-sm text-slate-custom">
                      <span>From: <strong className="text-navy">{selected.name}</strong></span>
                      <span>•</span>
                      <a href={`mailto:${selected.email}`} className="text-emerald hover:underline">{selected.email}</a>
                    </div>
                    <p className="text-xs text-slate-custom mt-1">{formatDate(selected.createdAt)}</p>
                  </div>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-primary !py-2.5 !px-5 text-sm">Reply</a>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-slate-custom leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl p-16 border border-gray-100 text-center">
                <FiInbox className="text-5xl text-gray-200 mx-auto mb-4" />
                <p className="text-slate-custom">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} loading={saving} message="Delete this message permanently?" />
    </div>
  );
};

export default ManageMessages;
