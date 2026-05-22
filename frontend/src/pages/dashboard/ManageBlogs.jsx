import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import DashboardModal from '../../components/dashboard/DashboardModal';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import ImageUpload from '../../components/dashboard/ImageUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';
import toast from 'react-hot-toast';

const emptyBlog = { title: '', content: '', excerpt: '', category: 'General', tags: '', coverImage: '', isPublished: true };

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = () => getAllBlogs().then(r => setBlogs(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyBlog); setModalOpen(true); };
  const openEdit = (b) => { setEditing(b._id); setForm({ ...b, tags: b.tags?.join(', ') || '' }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) { await updateBlog(editing, payload); toast.success('Blog updated!'); }
      else { await createBlog(payload); toast.success('Blog created!'); }
      setModalOpen(false); fetchData();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    try { await deleteBlog(deleteId); toast.success('Blog deleted!'); setConfirmOpen(false); fetchData(); }
    catch { toast.error('Failed to delete'); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage Blogs</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><FiPlus /> New Post</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="loader-spinner" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-light-gray border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-navy">Title</th>
                  <th className="text-left p-4 font-semibold text-navy hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold text-navy hidden md:table-cell">Date</th>
                  <th className="text-left p-4 font-semibold text-navy">Status</th>
                  <th className="text-right p-4 font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(b => (
                  <tr key={b._id} className="border-b border-gray-50 hover:bg-light-gray/50">
                    <td className="p-4 font-medium text-navy max-w-xs truncate">{b.title}</td>
                    <td className="p-4 text-slate-custom hidden md:table-cell">{b.category}</td>
                    <td className="p-4 text-slate-custom hidden md:table-cell">{formatDate(b.createdAt)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.isPublished ? 'bg-emerald/10 text-emerald' : 'bg-amber-100 text-amber-600'}`}>
                        {b.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(b)} className="p-2 text-royal hover:bg-royal/10 rounded-lg mr-1"><FiEdit2 size={16} /></button>
                      <button onClick={() => { setDeleteId(b._id); setConfirmOpen(true); }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DashboardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Blog Post' : 'New Blog Post'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Excerpt</label>
            <input value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" placeholder="Short summary..." />
          </div>
          <div className="pb-12">
            <label className="block text-sm font-medium text-navy mb-1">Content</label>
            <ReactQuill theme="snow" value={form.content} onChange={val => setForm({...form, content: val})} className="bg-white h-[250px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none">
                <option>General</option>
                <option>Tax Tips</option>
                <option>Accounting Basics</option>
                <option>Financial Advice</option>
                <option>Small Business Finance</option>
                <option>Budgeting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" placeholder="tax, finance, tips" />
            </div>
          </div>
          <ImageUpload currentImage={form.coverImage} onUpload={(url) => setForm({...form, coverImage: url})} label="Cover Image" />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-emerald focus:ring-emerald" />
            <span className="text-sm font-medium text-navy">Publish immediately</span>
          </label>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Blog Post'}
          </button>
        </div>
      </DashboardModal>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
};

export default ManageBlogs;
