import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../secrets";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50 rounded-t">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Bold">
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Italic">
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Underline">
        <FaUnderline />
      </button>

      {/* Headings */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("heading", { level })
              ? "bg-gray-200 text-blue-600"
              : "text-gray-700"
          }`}
          title={`Heading ${level}`}>
          H{level}
        </button>
      ))}
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("paragraph")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Paragraph">
        ¶
      </button>

      {/* Text Alignment */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Align Left">
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Align Center">
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Align Right">
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Justify">
        <FaAlignJustify />
      </button>

      {/* Lists */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Bullet List">
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Numbered List">
        <FaListOl />
      </button>

      {/* Link */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link")
            ? "bg-gray-200 text-blue-600"
            : "text-gray-700"
        }`}
        title="Link">
        <FaLink />
      </button>

      {/* Undo/Redo */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        title="Undo">
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        title="Redo">
        <FaRedo />
      </button>
    </div>
  );
};

const PageForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: true,
    showInNavbar: true,
    navbarOrder: 0
  });

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none p-4 min-h-[200px]",
      },
    },
  });

  // Sync editor content with form data
  useEffect(() => {
    if (editor && formData.content !== editor.getHTML()) {
      editor.commands.setContent(formData.content);
    }
  }, [formData.content, editor]);

  useEffect(() => {
    if (!isEdit) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/pages/id/${id}`);
        if (response.data.success) {
          const page = response.data.data;
          setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content,
            metaTitle: page.metaTitle || "",
            metaDescription: page.metaDescription || "",
            isPublished: page.isPublished,
            showInNavbar: page.showInNavbar,
            navbarOrder: page.navbarOrder
          });
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch page");
        toast.error(error.response?.data?.message || "Failed to fetch page");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.slug || !formData.content) {
      setError("Title, slug, and content are required");
      toast.error("Title, slug, and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = isEdit 
        ? `${BASE_URL}/api/pages/${id}`
        : `${BASE_URL}/api/pages`;
      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, formData);

      if (response.data.success) {
        toast.success(
          isEdit ? "Page updated successfully" : "Page created successfully"
        );
        navigate("/pages");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.join(", ") || 
        error.response?.data?.message || 
        "An error occurred";
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Page" : "Create New Page"}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                /
              </span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="flex-1 p-2 border rounded-r focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                required
                disabled={loading}
                placeholder="about-us"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
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

          <div>
            <label className="block text-gray-700 mb-2">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              disabled={loading}
              maxLength="100"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaTitle.length}/100 characters
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Meta Description</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              disabled={loading}
              rows={3}
              maxLength="160"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160 characters
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="isPublished" className="ml-2 block text-gray-700">
              Published
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInNavbar"
              name="showInNavbar"
              checked={formData.showInNavbar}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="showInNavbar" className="ml-2 block text-gray-700">
              Show in Navbar
            </label>
          </div>

          {formData.showInNavbar && (
            <div>
              <label className="block text-gray-700 mb-2">Navbar Order</label>
              <input
                type="number"
                name="navbarOrder"
                value={formData.navbarOrder}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                disabled={loading}
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/pages")}
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
              ? "Update Page"
              : "Create Page"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;