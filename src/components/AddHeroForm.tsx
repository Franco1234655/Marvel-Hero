import { useState } from 'react';
import { Plus, X, Zap } from 'lucide-react';

interface Hero {
  id: number;
  name: string;
  realName: string;
  universe: string;
  image?: string;
  powers?: string[];
  description?: string;
}

interface AddHeroFormProps {
  onAdd: (hero: Omit<Hero, 'id'>) => void;
  onEdit?: (hero: Hero) => void;
  editingHero?: Hero | null;
  onCancel: () => void;
  isOpen: boolean;
}

const AddHeroForm = ({ onAdd, onEdit, editingHero, onCancel, isOpen }: AddHeroFormProps) => {
  const [formData, setFormData] = useState({
    name: editingHero?.name || '',
    realName: editingHero?.realName || '',
    universe: editingHero?.universe || 'Earth-616',
    image: editingHero?.image || '',
    description: editingHero?.description || '',
    powers: editingHero?.powers || []
  });
  
  const [newPower, setNewPower] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.realName.trim()) return;
    
    const heroData = {
      name: formData.name.trim(),
      realName: formData.realName.trim(),
      universe: formData.universe,
      image: formData.image.trim() || undefined,
      description: formData.description.trim() || undefined,
      powers: formData.powers.length > 0 ? formData.powers : undefined
    };
    
    if (editingHero && onEdit) {
      onEdit({ ...heroData, id: editingHero.id });
    } else {
      onAdd(heroData);
    }
    
    // Reset form
    setFormData({
      name: '',
      realName: '',
      universe: 'Earth-616',
      image: '',
      description: '',
      powers: []
    });
    setNewPower('');
    onCancel();
  };

  const addPower = () => {
    if (newPower.trim() && !formData.powers.includes(newPower.trim())) {
      setFormData(prev => ({
        ...prev,
        powers: [...prev.powers, newPower.trim()]
      }));
      setNewPower('');
    }
  };

  const removePower = (powerToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      powers: prev.powers.filter(power => power !== powerToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-card rounded-xl border border-border/50 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-2xl font-orbitron font-bold text-primary flex items-center space-x-2">
            <Zap className="w-6 h-6" />
            <span>
              {editingHero ? 'Modifier le Héros' : 'Ajouter un Héros'}
            </span>
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-orbitron font-medium text-foreground">
                Nom du Héros *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="ex: Spider-Man"
                className="marvel-input"
                required
              />
            </div>

            {/* Real Name */}
            <div className="space-y-2">
              <label className="text-sm font-orbitron font-medium text-foreground">
                Nom Réel *
              </label>
              <input
                type="text"
                value={formData.realName}
                onChange={(e) => setFormData(prev => ({ ...prev, realName: e.target.value }))}
                placeholder="ex: Peter Parker"
                className="marvel-input"
                required
              />
            </div>
          </div>

          {/* Universe */}
          <div className="space-y-2">
            <label className="text-sm font-orbitron font-medium text-foreground">
              Univers
            </label>
            <select
              value={formData.universe}
              onChange={(e) => setFormData(prev => ({ ...prev, universe: e.target.value }))}
              className="marvel-input"
            >
              <option value="Earth-616">Earth-616 (Principal)</option>
              <option value="Earth-1610">Earth-1610 (Ultimate)</option>
              <option value="Earth-65">Earth-65 (Spider-Gwen)</option>
              <option value="Earth-928">Earth-928 (2099)</option>
              <option value="Earth-199999">Earth-199999 (MCU)</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-orbitron font-medium text-foreground">
              Image URL (optionnel)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://..."
              className="marvel-input"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-orbitron font-medium text-foreground">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Décrivez les origines et caractéristiques du héros..."
              rows={3}
              className="marvel-input resize-none"
            />
          </div>

          {/* Powers */}
          <div className="space-y-3">
            <label className="text-sm font-orbitron font-medium text-foreground">
              Pouvoirs (optionnel)
            </label>
            
            {/* Add Power Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newPower}
                onChange={(e) => setNewPower(e.target.value)}
                placeholder="ex: Super force"
                className="marvel-input"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPower())}
              />
              <button
                type="button"
                onClick={addPower}
                disabled={!newPower.trim()}
                className="btn-marvel-secondary px-4 py-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Powers List */}
            {formData.powers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.powers.map((power, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                  >
                    <span>{power}</span>
                    <button
                      type="button"
                      onClick={() => removePower(power)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="btn-marvel flex-1"
            >
              {editingHero ? 'Mettre à jour' : 'Ajouter le Héros'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-marvel-secondary px-6"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHeroForm;