import type { Story } from "../data/story";
import PitchBanner from "./PitchBanner";

type Props = {
  stories: Story[];
  onSelect: (storyId: string) => void;
};

export default function StorySelector({ stories, onSelect }: Props) {
  return (
    <div className="app-container">
      <div className="story-screen story-selector">
        <div className="selector-content">
          <PitchBanner />
          <h1 className="selector-title">Choose a Story</h1>
          <div className="story-cards">
            {stories.map((story) => (
              <button
                key={story.id}
                className="story-card"
                onClick={() => onSelect(story.id)}
              >
                <img
                  src={story.coverImage}
                  alt=""
                  className="story-card-image"
                />
                <div className="story-card-overlay">
                  <span className="story-card-title">{story.title}</span>
                  <span className="story-card-subtitle">{story.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
