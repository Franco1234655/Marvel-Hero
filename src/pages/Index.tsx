import { useState, useEffect } from 'react';
import { Plus, Shield, Zap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import marvelBanner from '@/assets/marvel-hero-banner.jpg';

import HeroCard from '@/components/HeroCard';
import AddHeroForm from '@/components/AddHeroForm';
import SearchAndFilters from '@/components/SearchAndFilters';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Hero, fetchHeroes, addHero, updateHero, deleteHero, searchHeroes, filterHeroesByUniverse } from '@/services/api';

const Index = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      setLoading(true);
      const data = await fetchHeroes();
      setHeroes(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les héros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddHero = async (heroData: Omit<Hero, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newHero = await addHero(heroData);
      setHeroes(prev => [newHero, ...prev]);
      toast({
        title: "Héros ajouté !",
        description: `${newHero.name} a rejoint l'équipe Marvel.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le héros.",
        variant: "destructive",
      });
    }
  };

  const handleEditHero = async (updatedHero: Hero) => {
    try {
      const hero = await updateHero(updatedHero.id, updatedHero);
      setHeroes(prev => prev.map(h => h.id === hero.id ? hero : h));
      setEditingHero(null);
      toast({
        title: "Héros modifié !",
        description: `${hero.name} a été mis à jour.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le héros.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHero = async (id: number) => {
    const hero = heroes.find(h => h.id === id);
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${hero?.name} ?`)) return;

    try {
      await deleteHero(id);
      setHeroes(prev => prev.filter(h => h.id !== id));
      toast({
        title: "Héros supprimé",
        description: `${hero?.name} a été retiré de l'équipe.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le héros.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadHeroes();
      return;
    }

    try {
      setLoading(true);
      const results = await searchHeroes(query);
      setHeroes(results);
    } catch (error) {
      toast({
        title: "Erreur de recherche",
        description: "Une erreur s'est produite lors de la recherche.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByUniverse = async (universe: string) => {
    if (activeFilters.includes(universe)) return;

    try {
      setLoading(true);
      const results = await filterHeroesByUniverse(universe);
      setHeroes(results);
      setActiveFilters([universe]);
    } catch (error) {
      toast({
        title: "Erreur de filtrage",
        description: "Une erreur s'est produite lors du filtrage.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    loadHeroes();
  };

  const openEditForm = (hero: Hero) => {
    setEditingHero(hero);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingHero(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={marvelBanner}
          alt="Marvel Heroes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-12 h-12 text-primary animate-hero-float" />
              <Zap className="w-10 h-10 text-secondary animate-power-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white">
              MARVEL
            </h1>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold bg-gradient-hero bg-clip-text text-transparent">
              HERO CHRONICLE
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Découvrez les super-héros Marvel les plus légendaires et créez votre propre univers héroïque
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-orbitron font-bold text-foreground">
              {heroes.length} Héros
            </h3>
            {activeFilters.length > 0 && (
              <span className="text-sm text-muted-foreground">
                (filtré par {activeFilters.join(', ')})
              </span>
            )}
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn-marvel flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un Héros</span>
          </button>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          onSearch={handleSearch}
          onFilterByUniverse={handleFilterByUniverse}
          onClearFilters={clearFilters}
          activeFilters={activeFilters}
        />

        {/* Heroes Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : heroes.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-orbitron font-medium text-foreground">
              {searchQuery || activeFilters.length > 0 
                ? "Aucun héros trouvé"
                : "Aucun héros dans la base"
              }
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchQuery || activeFilters.length > 0
                ? "Essayez de modifier vos critères de recherche ou de filtrage."
                : "Commencez par ajouter votre premier super-héros Marvel !"
              }
            </p>
            {(searchQuery || activeFilters.length > 0) && (
              <button
                onClick={clearFilters}
                className="btn-marvel-secondary mt-4"
              >
                Voir tous les héros
              </button>
            )}
          </div>
        ) : (
          <div className="heroes-grid">
            {heroes.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onEdit={openEditForm}
                onDelete={handleDeleteHero}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Hero Form */}
      <AddHeroForm
        isOpen={isFormOpen}
        onAdd={handleAddHero}
        onEdit={handleEditHero}
        editingHero={editingHero}
        onCancel={closeForm}
      />
    </div>
  );
};

export default Index;
