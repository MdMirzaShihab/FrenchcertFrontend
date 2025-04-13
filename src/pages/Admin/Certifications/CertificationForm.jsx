import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaLink,
  FaPalette,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify
} from 'react-icons/fa';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl || 'https://');

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50 rounded-t">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Underline"
      >
        <FaUnderline />
      </button>

      {/* Headings */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <div className="relative group">
        <button
          type="button"
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          title="Headings"
        >
          <FaHeading />
        </button>
        <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
          <div className="py-1">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={`block w-full text-left px-4 py-2 text-sm ${editor.isActive('heading', { level }) ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Heading {level}
              </button>
            ))}
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`block w-full text-left px-4 py-2 text-sm ${editor.isActive('paragraph') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Paragraph
            </button>
          </div>
        </div>
      </div>

      {/* Text Alignment */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Justify"
      >
        <FaAlignJustify />
      </button>

      {/* Lists */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Numbered List"
      >
        <FaListOl />
      </button>

      {/* Link */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Link"
      >
        <FaLink />
      </button>

      {/* Text Color */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <div className="flex items-center">
        <label htmlFor="text-color" className="p-2 text-gray-700">
          <FaPalette />
        </label>
        <input
          id="text-color"
          type="color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="h-8 w-8 cursor-pointer border rounded"
          title="Text Color"
        />
      </div>

      {/* Undo/Redo */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        title="Undo"
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        title="Redo"
      >
        <FaRedo />
      </button>
    </div>
  );
};


const CertificationForm = ({ isEdit = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [availableFields, setAvailableFields] = useState([]);
  
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      certificationType: "",
      fields: [],
      durationInMonths: 12,
    });

 // Initialize Tiptap editor with all extensions
 const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, description: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-4 min-h-[200px]',
      },
    },
  });

  // Sync editor content with form data
  useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fieldsRes = await axios.get(`${BASE_URL}/api/fields`);
        if (fieldsRes.data.success) setAvailableFields(fieldsRes.data.data);

        if (isEdit) {
          const certRes = await axios.get(`${BASE_URL}/api/certifications/${id}`);
          if (certRes.data.success) {
            const cert = certRes.data.data;
            setFormData({
              name: cert.name,
              description: cert.description,
              certificationType: cert.certificationType,
              fields: cert.fields.map((f) => f._id),
              durationInMonths: cert.durationInMonths || 12,
            });
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldToggle = (fieldId) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.includes(fieldId)
        ? prev.fields.filter((id) => id !== fieldId)
        : [...prev.fields, fieldId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit
        ? `${BASE_URL}/api/certifications/${id}`
        : `${BASE_URL}/api/certifications`;
      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, {
        ...formData,
        description: editor?.getHTML() || formData.description,
      });

      if (response.data.success) {
        toast.success(
          isEdit
            ? "Certification updated successfully"
            : "Certification created successfully"
        );
        navigate("/admin/certifications");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="p-6">Loading certification data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Certification" : "Add New Certification"}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="border rounded-lg overflow-hidden">
              <MenuBar editor={editor} />
              <EditorContent 
                editor={editor} 
                className="min-h-[200px] border-t"
                disabled={loading}
              />
            </div>
          </div>


          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Certification Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="certificationType"
              value={formData.certificationType}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
              disabled={loading}
              placeholder="e.g., ISO 9001, Cybersecurity, etc."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Duration (months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="durationInMonths"
              min="1"
              value={formData.durationInMonths}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Fields</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableFields.map((field) => (
                <label key={field._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.fields.includes(field._id)}
                    onChange={() => handleFieldToggle(field._id)}
                    className="mr-2"
                    disabled={loading}
                  />
                  {field.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/certifications")}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={loading}>
            {loading
              ? "Processing..."
              : isEdit
              ? "Update Certification"
              : "Save Certification"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;