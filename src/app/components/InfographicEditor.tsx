import { InfographicData } from "../types";

interface InfographicEditorProps {
  data: InfographicData;
  onDataChange: (data: InfographicData) => void;
  onExportClick: () => void;
}

export function InfographicEditor({ data, onDataChange, onExportClick }: InfographicEditorProps) {
  const updateField = (field: string, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const updateFooter = (field: string, value: string) => {
    onDataChange({
      ...data,
      footer: { ...data.footer, [field]: value }
    });
  };

  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...data.blocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    onDataChange({ ...data, blocks: newBlocks });
  };

  const addBlock = () => {
    onDataChange({
      ...data,
      blocks: [
        ...data.blocks,
        {
          title: "New Block",
          code: "// Write your code here",
          description: "Block description"
        }
      ]
    });
  };

  const removeBlock = (index: number) => {
    if (data.blocks.length > 1) {
      const newBlocks = data.blocks.filter((_, i) => i !== index);
      onDataChange({ ...data, blocks: newBlocks });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updateFooter('profilePic', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Infographic Editor</h2>

      {/* Main Info Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Main Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full bg-gray-700 rounded px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full bg-gray-700 rounded px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Profile Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={data.footer.name}
              onChange={(e) => updateFooter('name', e.target.value)}
              className="w-full bg-gray-700 rounded px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={data.footer.username}
              onChange={(e) => updateFooter('username', e.target.value)}
              className="w-full bg-gray-700 rounded px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <div className="flex items-center gap-3">
              <img 
                src={data.footer.profilePic} 
                alt="Profile preview" 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
              />
              <label className="flex-1 cursor-pointer">
                <div className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm text-center transition-colors">
                Change Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Content Blocks</h3>
          <button
            onClick={addBlock}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            + Add Block
          </button>
        </div>
        
        <div className="space-y-4">
          {data.blocks.map((block, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">Block {index + 1}</h4>
                <button
                  onClick={() => removeBlock(index)}
                  className="text-red-400 hover:text-red-300 text-xs"
                  disabled={data.blocks.length <= 1}
                >
                  Delete
                </button>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs mb-1">Title</label>
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateBlock(index, "title", e.target.value)}
                    className="w-full bg-gray-600 rounded px-2 py-1 text-xs"
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Code</label>
                  <textarea
                    value={block.code}
                    onChange={(e) => updateBlock(index, "code", e.target.value)}
                    rows={3}
                    className="w-full bg-gray-600 rounded px-2 py-1 text-xs font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Description</label>
                  <input
                    type="text"
                    value={block.description}
                    onChange={(e) => updateBlock(index, "description", e.target.value)}
                    className="w-full bg-gray-600 rounded px-2 py-1 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}