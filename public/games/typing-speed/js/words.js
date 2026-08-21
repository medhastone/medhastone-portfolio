const WORDS = {
    common: [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with",
        "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
        "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just",
        "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
        "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after",
        "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any",
        "these", "give", "day", "most", "us", "is", "are", "was", "were", "been", "has", "had", "doing",
        "water", "system", "program", "question", "government", "number", "night", "point", "home", "room"
    ],
    tech: [
        "algorithm", "application", "bandwidth", "binary", "browser", "byte", "cache", "cloud", "compiler",
        "database", "debug", "developer", "domain", "encryption", "ethernet", "firewall", "framework",
        "hardware", "interface", "javascript", "kernel", "latency", "linux", "malware", "network", "node",
        "packet", "password", "phishing", "platform", "protocol", "python", "query", "react", "router",
        "server", "software", "syntax", "terminal", "token", "variable", "virtual", "windows", "wireless"
    ],
    sentences: [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is the art of telling another human what one wants the computer to do.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "In the middle of difficulty lies opportunity.",
        "The only way to do great work is to love what you do.",
        "Design is not just what it looks like and feels like. Design is how it works."
    ]
};

function getRandomWords(count, type = 'common') {
    const list = WORDS[type] || WORDS.common;
    const result = [];
    for(let i = 0; i < count; i++) {
        result.push(list[Math.floor(Math.random() * list.length)]);
    }
    return result;
}

function getRandomSentence() {
    return WORDS.sentences[Math.floor(Math.random() * WORDS.sentences.length)];
}
