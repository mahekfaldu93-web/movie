import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Film,
  PlusCircle,
  Upload,
  Image as ImageIcon,
  Star,
  Clock,
  Calendar,
  User,
  Sparkles,
  CheckCircle,
  Video,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addCustomMovie } from '../redux/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const SAMPLE_PRESETS = [
  {
    title: 'Cyberpunk 2099: Neon Horizon',
    tagline: 'When the matrix collapses, freedom begins.',
    release_date: '2025-11-14',
    vote_average: 8.8,
    runtime: 145,
    director: 'Ridley Vance',
    cast: 'Keanu Reeves, Ana de Armas, Michael B. Jordan',
    genres: ['Science Fiction', 'Action', 'Thriller'],
    overview:
      'In a mega-metropolis powered by quantum neural links, a rogue cyborg investigator unravels a syndicate conspiracy that alters human memories and threatens humanity’s last free colony.',
    poster_path:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80',
    trailerKey: 'dQw4w9WgXcQ',
  },
  {
    title: 'Shadows of Varanasi',
    tagline: 'Ancient secrets along the eternal river.',
    release_date: '2025-08-22',
    vote_average: 9.1,
    runtime: 156,
    director: 'Sanjay Rathore',
    cast: 'Manoj Bajpayee, Tabu, Vicky Kaushal',
    genres: ['Mystery', 'Crime', 'Drama'],
    overview:
      'A veteran detective uncovers a centuries-old clandestine puzzle hidden inside the mystic alleyways and ghats of Varanasi after an inexplicable historical relic disappears.',
    poster_path:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1280&auto=format&fit=crop&q=80',
    trailerKey: 'dQw4w9WgXcQ',
  },
  {
    title: 'Chronicles of Solaria',
    tagline: 'Every star tells a legend.',
    release_date: '2026-03-10',
    vote_average: 8.5,
    runtime: 138,
    director: 'Aria Sterling',
    cast: 'Zendaya, Dev Patel, Florence Pugh',
    genres: ['Fantasy', 'Adventure', 'Science Fiction'],
    overview:
      'Across celestial islands floating in eternal twilight, an astronomer and a forgotten guardian journey to rekindle the celestial beacon before shadow engulfs their worlds.',
    poster_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280&auto=format&fit=crop&q=80',
    trailerKey: 'dQw4w9WgXcQ',
  },
];

const AVAILABLE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
];

const AddMovie = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    release_date: new Date().toISOString().split('T')[0],
    vote_average: 8.0,
    runtime: 120,
    director: '',
    cast: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    trailerKey: '',
  });

  const [selectedGenres, setSelectedGenres] = useState(['Action', 'Adventure']);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdMovieId, setCreatedMovieId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleGenreToggle = (genreName) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreName)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((g) => g !== genreName);
      }
      return [...prev, genreName];
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const applyPreset = (preset) => {
    setFormData({
      title: preset.title,
      tagline: preset.tagline,
      release_date: preset.release_date,
      vote_average: preset.vote_average,
      runtime: preset.runtime,
      director: preset.director,
      cast: preset.cast,
      overview: preset.overview,
      poster_path: preset.poster_path,
      backdrop_path: preset.backdrop_path,
      trailerKey: preset.trailerKey,
    });
    setSelectedGenres(preset.genres);
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Movie Title is required.';
    }
    if (!formData.overview.trim()) {
      errs.overview = 'Overview / Storyline is required.';
    }
    if (selectedGenres.length === 0) {
      errs.genres = 'Select at least one genre.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const newId = Date.now();

    // Map genre names to genres array and genre_ids
    const genreObjects = selectedGenres.map((gName) => {
      const match = AVAILABLE_GENRES.find((g) => g.name.toLowerCase() === gName.toLowerCase());
      return {
        id: match ? match.id : Math.floor(Math.random() * 9000) + 1000,
        name: gName,
      };
    });
    const genreIds = genreObjects.map((g) => g.id);

    // Parse cast
    const castList = formData.cast
      ? formData.cast.split(',').map((name, idx) => ({
          id: newId + idx,
          name: name.trim(),
          character: 'Starring',
          profile_path: null,
        }))
      : [];

    const fallbackPoster =
      formData.poster_path.trim() ||
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
    const fallbackBackdrop =
      formData.backdrop_path.trim() ||
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80';

    const cleanTrailerKey = formData.trailerKey
      ? formData.trailerKey.includes('v=')
        ? formData.trailerKey.split('v=')[1].split('&')[0]
        : formData.trailerKey.replace('https://youtu.be/', '').replace('https://www.youtube.com/watch?v=', '')
      : 'dQw4w9WgXcQ';

    const newMovie = {
      id: newId,
      title: formData.title.trim(),
      tagline: formData.tagline.trim() || 'An extraordinary cinematic story.',
      overview: formData.overview.trim(),
      release_date: formData.release_date || new Date().toISOString().split('T')[0],
      vote_average: parseFloat(formData.vote_average) || 7.5,
      vote_count: 1,
      runtime: parseInt(formData.runtime, 10) || 120,
      director: formData.director.trim() || 'Independent Producer',
      cast: castList,
      genres: genreObjects,
      genre_ids: genreIds,
      poster_path: fallbackPoster,
      backdrop_path: fallbackBackdrop,
      trailerKey: cleanTrailerKey,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    dispatch(addCustomMovie(newMovie));
    setCreatedMovieId(newId);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previewMovieObject = {
    id: createdMovieId || 999999,
    title: formData.title.trim() || 'Your Movie Title',
    release_date: formData.release_date || '2025',
    vote_average: parseFloat(formData.vote_average) || 8.0,
    poster_path:
      formData.poster_path.trim() ||
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    overview: formData.overview.trim() || 'Your movie storyline will appear here.',
    isCustom: true,
  };

  return (
    <div className="container py-4 add-movie-page">
      <div className="mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <Link to="/movies" className="text-secondary small d-inline-flex align-items-center gap-1 mb-2 hover-underline">
            <ArrowLeft size={16} /> Back to Movies
          </Link>
          <h1 className="h3 fw-bold text-main d-flex align-items-center gap-2 mb-1">
            <PlusCircle className="text-accent" size={28} /> Add New Movie
          </h1>
          <p className="text-muted small mb-0">
            Create and save your custom movie to CineVault. It will appear across your library and search!
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/movies" className="btn btn-sm btn-nav-outline">
            View All Movies
          </Link>
        </div>
      </div>

      {isSuccess && (
        <div className="alert-custom-success mb-4 p-4 rounded-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="success-icon-badge">
              <CheckCircle size={32} />
            </div>
            <div>
              <h5 className="fw-bold mb-1 text-white">Movie Added Successfully!</h5>
              <p className="mb-0 text-white-50 small">
                "{formData.title}" is now added to your movie library, search index, and home feed.
              </p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/movie/${createdMovieId}`} className="btn btn-sm btn-nav-primary">
              <Eye size={16} /> View Movie Page
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-nav-outline"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  title: '',
                  tagline: '',
                  release_date: new Date().toISOString().split('T')[0],
                  vote_average: 8.0,
                  runtime: 120,
                  director: '',
                  cast: '',
                  overview: '',
                  poster_path: '',
                  backdrop_path: '',
                  trailerKey: '',
                });
              }}
            >
              Add Another Movie
            </button>
          </div>
        </div>
      )}

      {/* Preset Auto-Fill Bar */}
      <div className="card-glass p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <span className="small text-secondary fw-semibold d-flex align-items-center gap-2">
            <Sparkles size={16} className="text-accent-gold" /> Quick 1-Click Sample Movies:
          </span>
          <div className="d-flex flex-wrap gap-2">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-sm btn-sample-chip"
                onClick={() => applyPreset(preset)}
              >
                + {preset.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Form Column */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="card-glass p-4">
            <h4 className="fw-bold text-main mb-3 pb-2 border-bottom border-subtle d-flex align-items-center gap-2">
              <Film size={20} className="text-accent" /> Movie Information
            </h4>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">
                Movie Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control form-control-glass ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. Inception: The Awakening"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
            </div>

            {/* Tagline */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Tagline / Catchphrase</label>
              <input
                type="text"
                name="tagline"
                className="form-control form-control-glass"
                placeholder="e.g. Your mind is the scene of the crime."
                value={formData.tagline}
                onChange={handleInputChange}
              />
            </div>

            {/* Row: Date, Rating, Runtime */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                  <Calendar size={14} /> Release Date
                </label>
                <input
                  type="date"
                  name="release_date"
                  className="form-control form-control-glass"
                  value={formData.release_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary d-flex align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-1">
                    <Star size={14} className="text-accent-gold" /> Rating (0 - 10)
                  </span>
                  <span className="badge badge-accent-gold">{formData.vote_average} / 10</span>
                </label>
                <input
                  type="range"
                  name="vote_average"
                  min="1"
                  max="10"
                  step="0.1"
                  className="form-range custom-range"
                  value={formData.vote_average}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                  <Clock size={14} /> Runtime (Minutes)
                </label>
                <input
                  type="number"
                  name="runtime"
                  min="1"
                  max="600"
                  className="form-control form-control-glass"
                  placeholder="e.g. 142"
                  value={formData.runtime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Row: Director & Cast */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                  <User size={14} /> Director
                </label>
                <input
                  type="text"
                  name="director"
                  className="form-control form-control-glass"
                  placeholder="e.g. Christopher Nolan"
                  value={formData.director}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                  <Film size={14} /> Cast / Actors (Comma Separated)
                </label>
                <input
                  type="text"
                  name="cast"
                  className="form-control form-control-glass"
                  placeholder="e.g. Cillian Murphy, Emily Blunt, Matt Damon"
                  value={formData.cast}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Genres multi-select pills */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary d-block">
                Select Genres <span className="text-danger">*</span>
              </label>
              <div className="d-flex flex-wrap gap-2">
                {AVAILABLE_GENRES.map((g) => {
                  const isSelected = selectedGenres.includes(g.name);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      className={`genre-select-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => handleGenreToggle(g.name)}
                    >
                      {g.name}
                    </button>
                  );
                })}
              </div>
              {errors.genres && <div className="text-danger small mt-1">{errors.genres}</div>}
            </div>

            {/* Overview / Storyline */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">
                Overview / Synopsis <span className="text-danger">*</span>
              </label>
              <textarea
                name="overview"
                rows="4"
                className={`form-control form-control-glass ${errors.overview ? 'is-invalid' : ''}`}
                placeholder="Write an engaging summary of the movie plot, conflicts, and world..."
                value={formData.overview}
                onChange={handleInputChange}
                required
              />
              {errors.overview && <div className="text-danger small mt-1">{errors.overview}</div>}
            </div>

            {/* Media & Artwork Section */}
            <h4 className="fw-bold text-main mb-3 pb-2 border-bottom border-subtle d-flex align-items-center gap-2">
              <ImageIcon size={20} className="text-accent" /> Posters &amp; Artwork
            </h4>

            {/* Poster URL or File */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary d-flex align-items-center justify-content-between">
                <span>Poster Image (URL or Upload File)</span>
                <span className="text-muted small">Standard portrait 2:3 ratio</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="poster_path"
                  className="form-control form-control-glass"
                  placeholder="Paste image URL (https://...)"
                  value={formData.poster_path}
                  onChange={handleInputChange}
                />
                <label className="btn btn-nav-outline d-flex align-items-center gap-1 mb-0 cursor-pointer">
                  <Upload size={15} /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleFileUpload(e, 'poster_path')}
                  />
                </label>
              </div>
            </div>

            {/* Backdrop URL or File */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary d-flex align-items-center justify-content-between">
                <span>Backdrop Banner (URL or Upload File)</span>
                <span className="text-muted small">Landscape 16:9 ratio</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="backdrop_path"
                  className="form-control form-control-glass"
                  placeholder="Paste banner image URL (https://...)"
                  value={formData.backdrop_path}
                  onChange={handleInputChange}
                />
                <label className="btn btn-nav-outline d-flex align-items-center gap-1 mb-0 cursor-pointer">
                  <Upload size={15} /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleFileUpload(e, 'backdrop_path')}
                  />
                </label>
              </div>
            </div>

            {/* YouTube Trailer */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                <Video size={14} className="text-accent" /> YouTube Trailer (Video ID or Full URL)
              </label>
              <input
                type="text"
                name="trailerKey"
                className="form-control form-control-glass"
                placeholder="e.g. dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={formData.trailerKey}
                onChange={handleInputChange}
              />
              <div className="form-text text-muted small">
                Paste any YouTube URL or 11-character video ID to embed the official trailer!
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex align-items-center justify-content-end gap-3 pt-3 border-top border-subtle">
              <button
                type="button"
                className="btn btn-nav-outline px-4"
                onClick={() => navigate('/movies')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-nav-primary px-4 py-2 d-flex align-items-center gap-2">
                <PlusCircle size={18} /> Save &amp; Publish Movie
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Column */}
        <div className="col-lg-4">
          <div className="sticky-preview-card card-glass p-3">
            <h5 className="fw-bold text-main mb-3 d-flex align-items-center justify-content-between">
              <span className="d-flex align-items-center gap-2">
                <Eye size={18} className="text-accent" /> Live Card Preview
              </span>
              <span className="badge badge-custom-movie">Custom</span>
            </h5>

            <div className="preview-container mx-auto" style={{ maxWidth: '240px' }}>
              <MovieCard movie={previewMovieObject} />
            </div>

            <div className="mt-3 p-3 rounded-3 preview-meta-box">
              <div className="small fw-semibold text-main mb-1">Selected Genres:</div>
              <div className="d-flex flex-wrap gap-1 mb-2">
                {selectedGenres.map((g, idx) => (
                  <span key={idx} className="badge bg-secondary bg-opacity-25 text-secondary small">
                    {g}
                  </span>
                ))}
              </div>

              {formData.director && (
                <div className="small text-secondary mb-1">
                  <span className="text-muted">Director:</span> {formData.director}
                </div>
              )}

              {formData.cast && (
                <div className="small text-secondary text-truncate">
                  <span className="text-muted">Cast:</span> {formData.cast}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
