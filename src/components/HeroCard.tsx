import { useState } from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Hero {
  id: number;
  name: string;
  realName: string;
  universe: string;
  image?: string;
  powers?: string[];
  description?: string;
}

interface HeroCardProps {
  hero: Hero;
  onEdit: (hero: Hero) => void;
  onDelete: (id: number) => void;
}

const HeroCard = ({ hero, onEdit, onDelete }: HeroCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [showRealName, setShowRealName] = useState(false);

  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.name)}&size=300&background=0f172a&color=ef4444&bold=true&font-size=0.5`;

  return (
    <div className="hero-card group">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={imageError || !hero.image ? defaultImage : hero.image}
          alt={hero.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(hero)}
            className="btn-marvel-secondary p-2 rounded-lg"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(hero.id)}
            className="btn-marvel-danger p-2 rounded-lg"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-orbitron font-bold text-primary">
            {hero.name}
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRealName(!showRealName)}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              {showRealName ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>{showRealName ? 'Masquer' : 'Révéler'}</span>
            </button>
          </div>
          
          {showRealName && (
            <p className="text-secondary font-medium animate-slide-up">
              {hero.realName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Univers:</span>
            <span className="text-sm font-medium text-accent">
              {hero.universe}
            </span>
          </div>
          
          {hero.powers && hero.powers.length > 0 && (
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Pouvoirs:</span>
              <div className="flex flex-wrap gap-1">
                {hero.powers.slice(0, 3).map((power, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                  >
                    {power}
                  </span>
                ))}
                {hero.powers.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-muted/20 text-muted-foreground">
                    +{hero.powers.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {hero.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {hero.description}
            </p>
          )}
        </div>

        {/* Marvel Stats Bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-marvel rounded-full animate-power-pulse"
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;