import { entity_type_map } from "../utils/maps";
// Note: All functions are pure functions - create a copy of the original 
// state before modifying.

// entityType: 
// {1: page, 2: comments, 3: journal}
export const findEmoji = (emojis, entityType, entityId) => {
    for (let emoji of Object.values(emojis)) {
        if (emoji.entity_type == entity_type_map[entityType] && emoji.entity_id == entityId) {
            return emoji.emoji;
        }
    }
    
    return "1F415"; // Dog placeholder emoji if no emoji is found.
  }

export const findComments = (comments, entityType, entityId) => {
    const filteredComments = [];
    for (let comment of Object.values(comments)) {
        if (comment.entity_type == entity_type_map[entityType] && comment.entity_id == entityId) {
            filteredComments.push(comment.comment);
        }
    }
    return filteredComments;
}