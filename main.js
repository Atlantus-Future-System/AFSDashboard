var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DashboardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");

// src/components/Project.ts
var import_obsidian = require("obsidian");

// src/data/ProjectData.ts
var PROJECT_PHASES = [
  { code: "PPH001", name: "project-init", text: "\u0406\u043D\u0456\u0446\u0456\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u044F" },
  { code: "PPH002", name: "project-plan", text: "\u041F\u043B\u0430\u043D\u0443\u0432\u0430\u043D\u043D\u044F" },
  { code: "PPH003", name: "project-design", text: "\u041F\u0440\u043E\u0454\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F" },
  { code: "PPH004", name: "project-dev", text: "\u0420\u043E\u0437\u0440\u043E\u0431\u043A\u0430" },
  { code: "PPH005", name: "project-test", text: "\u0422\u0435\u0441\u0442\u0443\u0432\u0430\u043D\u043D\u044F" },
  { code: "PPH006", name: "project-complete", text: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0456 \u0430\u0440\u0445\u0456\u0432\u0443\u0432\u0430\u043D\u043D\u044F" }
];
function getProjects(app) {
  var _a;
  const projects = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "project") {
      continue;
    }
    projects.push({
      file,
      title: file.basename,
      status: String((_a = frontmatter.status) != null ? _a : ""),
      phase: frontmatter.phase ? String(frontmatter.phase) : void 0,
      phaseName: frontmatter["phase-name"] ? String(frontmatter["phase-name"]) : void 0,
      phaseProgress: frontmatter["phase-progress"] !== void 0 ? Number(frontmatter["phase-progress"]) : void 0,
      projectProgress: frontmatter["project-progress"] !== void 0 ? Number(frontmatter["project-progress"]) : void 0
    });
  }
  return projects;
}
function getProjectPhase(name) {
  var _a;
  if (!name) {
    return null;
  }
  return (_a = PROJECT_PHASES.find((phase) => phase.name === name)) != null ? _a : null;
}
async function createProject(app, name, version, category) {
  const now = /* @__PURE__ */ new Date();
  const pad = (value) => {
    return String(value).padStart(2, "0");
  };
  const createdDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-`;
  const content = `---
    type: project
    status: planning
    phase: PPH001
    phase-name: project-init
    project-category: ${category}
    dt-created: ${createdDate}
    dt-modified:
    dt-completed:
    version: ${version}
---

## \u041E\u043F\u0438\u0441
\u041E\u043F\u0438\u0441 \u043F\u0440\u043E\u0454\u043A\u0442\u0443.

## \u041C\u0435\u0442\u0430
\u041C\u0435\u0442\u0430 \u043F\u0440\u043E\u0454\u043A\u0442\u0443.

## \u0415\u0442\u0430\u043F\u0438
\u0421\u043F\u0438\u0441\u043E\u043A \u0435\u0442\u0430\u043F\u0456\u0432 \u0440\u0435\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u0457 \u043F\u0440\u043E\u0454\u043A\u0442\u0443.

## \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F
\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F \u043F\u043E \u043F\u0440\u043E\u0454\u043A\u0442\u0443.

## \u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F
\u041F\u043E\u0432'\u044F\u0437\u0430\u043D\u0456 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0437 \u043F\u0440\u043E\u0454\u043A\u0442\u043E\u043C.

## \u041D\u043E\u0442\u0430\u0442\u043A\u0438
\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0449\u043E\u0434\u043E \u043F\u0440\u043E\u0454\u043A\u0442\u0443.
`;
  try {
    const file = await app.vault.create(`${name}.md`, content);
    await app.workspace.getLeaf(false).openFile(file);
  } catch (error) {
    console.error("Failed to create project:", error);
  }
}
function getCurrentProject(app) {
  var _a;
  return (_a = getProjects(app).find((project) => project.status === "current")) != null ? _a : null;
}

// src/components/Project.ts
function renderProjects(container, app) {
  const block = container.createDiv({
    cls: "dashboard-block projects"
  });
  const grid = block.createDiv({
    cls: "projects-grid"
  });
  const planned = grid.createDiv({
    cls: "project-section planned-projects"
  });
  const completed = grid.createDiv({
    cls: "project-section completed-projects"
  });
  renderProjectSection(
    planned,
    "\u0417\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u0456 \u043F\u0440\u043E\u0454\u043A\u0442\u0438",
    "planning",
    "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0437\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u0456 \u043F\u0440\u043E\u0454\u043A\u0442\u0438",
    app
  );
  renderProjectSection(
    completed,
    "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0456 \u043F\u0440\u043E\u0454\u043A\u0442\u0438",
    "completed",
    "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0430\u0440\u0445\u0456\u0432 \u043F\u0440\u043E\u0454\u043A\u0442\u0456\u0432",
    app
  );
}
function renderProjectSection(container, title, status, buttonText, app) {
  container.createEl("h2", {
    text: title
  });
  const projects = getProjects(app).filter((project) => project.status === status).slice(0, 8);
  if (projects.length === 0) {
    container.createEl("p", {
      text: "\u041F\u0440\u043E\u0454\u043A\u0442\u0438 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456."
    });
  } else {
    const list = container.createEl("ol");
    for (const project of projects) {
      const item = list.createEl("li");
      const link = item.createEl("a", {
        text: project.title,
        cls: "internal-link"
      });
      link.addEventListener("click", (event) => {
        event.preventDefault();
        void app.workspace.getLeaf(false).openFile(project.file);
      });
    }
  }
  const button = container.createEl("button", {
    text: buttonText,
    cls: "project-action-button"
  });
  button.setAttribute(
    "title",
    status === "planning" ? "\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0432\u0441\u0456 \u0437\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u0456 \u043F\u0440\u043E\u0454\u043A\u0442\u0438" : "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0430\u0440\u0445\u0456\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0445 \u043F\u0440\u043E\u0454\u043A\u0442\u0456\u0432"
  );
  button.addEventListener("click", () => {
    new import_obsidian.Notice("\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456.");
  });
}

// src/components/CurrentProject.ts
function getPhaseNumber(phase) {
  if (!phase) {
    return "-";
  }
  return String(Number(phase.replace("PPH", "")));
}
function renderCurrentProject(container, app) {
  var _a, _b, _c;
  const block = container.createDiv({
    cls: "dashboard-block current-project"
  });
  const project = getCurrentProject(app);
  const phase = getProjectPhase(project == null ? void 0 : project.phaseName);
  if (!project) {
    block.createEl("h2", {
      text: "\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442",
      cls: "current-project-title"
    });
    block.createEl("p", {
      text: "\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439."
    });
    return;
  }
  const title = block.createEl("h2", {
    cls: "current-project-title"
  });
  const link = title.createEl("a", {
    text: project.title,
    cls: "internal-link"
  });
  link.addEventListener("click", (event) => {
    event.preventDefault();
    void app.workspace.getLeaf(false).openFile(project.file);
  });
  const projectInfo = block.createDiv({
    cls: "current-project-info"
  });
  const status = projectInfo.createEl("p", {
    cls: `project-status status-${project.status}`
  });
  status.createSpan({ text: "\u0421\u0442\u0430\u0442\u0443\u0441: " });
  status.createSpan({
    text: project.status.toUpperCase(),
    cls: "project-status-value"
  });
  projectInfo.createEl("p", {
    text: `\u0424\u0430\u0437\u0430 \u2116${getPhaseNumber(project.phase)}: ${(_a = phase == null ? void 0 : phase.text) != null ? _a : "-"}`
  });
  projectInfo.createEl("p", {
    text: `\u041F\u0440\u043E\u0433\u0440\u0435\u0441 \u0444\u0430\u0437\u0438: ${(_b = project.phaseProgress) != null ? _b : 0}%`
  });
  projectInfo.createEl("p", {
    text: `\u041F\u043E\u0442\u043E\u0447\u043D\u0456 \u0446\u0456\u043B\u0456: \u0412 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456. \u0411\u0443\u0434\u0435 \u0432 \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u0432\u0435\u0440\u0441\u0456\u044F\u0445`
  });
  projectInfo.createEl("p", {
    text: `\u041F\u0440\u043E\u0433\u0440\u0435\u0441 \u043F\u0440\u043E\u0454\u043A\u0442\u0443: ${(_c = project.projectProgress) != null ? _c : 0}%`
  });
}

// src/components/Calendar.ts
function renderCalendar(container) {
  const block = container.createDiv({
    cls: "dashboard-block calendar"
  });
  const currentDate = block.createDiv({
    cls: "calendar-current-date"
  });
  const table = block.createEl("table", {
    cls: "dashboard-calendar"
  });
  const monthNames = [
    "\u0421\u0456\u0447\u0435\u043D\u044C",
    "\u041B\u044E\u0442\u0438\u0439",
    "\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C",
    "\u041A\u0432\u0456\u0442\u0435\u043D\u044C",
    "\u0422\u0440\u0430\u0432\u0435\u043D\u044C",
    "\u0427\u0435\u0440\u0432\u0435\u043D\u044C",
    "\u041B\u0438\u043F\u0435\u043D\u044C",
    "\u0421\u0435\u0440\u043F\u0435\u043D\u044C",
    "\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C",
    "\u0416\u043E\u0432\u0442\u0435\u043D\u044C",
    "\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434",
    "\u0413\u0440\u0443\u0434\u0435\u043D\u044C"
  ];
  const dayNames = [
    "\u041D\u0435\u0434\u0456\u043B\u044F",
    "\u041F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A",
    "\u0412\u0456\u0432\u0442\u043E\u0440\u043E\u043A",
    "\u0421\u0435\u0440\u0435\u0434\u0430",
    "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
    "\u041F'\u044F\u0442\u043D\u0438\u0446\u044F",
    "\u0421\u0443\u0431\u043E\u0442\u0430"
  ];
  const weekdays = [
    "\u041F\u043D",
    "\u0412\u0442",
    "\u0421\u0440",
    "\u0427\u0442",
    "\u041F\u0442",
    "\u0421\u0431",
    "\u041D\u0434"
  ];
  let displayedMonth = -1;
  let displayedYear = -1;
  const updateCalendar = () => {
    const now = /* @__PURE__ */ new Date();
    const day = String(
      now.getDate()
    ).padStart(2, "0");
    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(
      now.getHours()
    ).padStart(2, "0");
    const minutes = String(
      now.getMinutes()
    ).padStart(2, "0");
    const seconds = String(
      now.getSeconds()
    ).padStart(2, "0");
    currentDate.textContent = `${dayNames[now.getDay()]} ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    if (displayedMonth === now.getMonth() && displayedYear === now.getFullYear()) {
      return;
    }
    displayedMonth = now.getMonth();
    displayedYear = now.getFullYear();
    table.empty();
    const monthRow = table.createEl("tr", { cls: "calendar-month-row" });
    const monthCell = monthRow.createEl("th", {
      text: monthNames[now.getMonth()]
    });
    monthCell.colSpan = 7;
    const headerRow = table.createEl("tr");
    for (let weekday = 0; weekday < weekdays.length; weekday++) {
      const header = headerRow.createEl("th", {
        text: weekdays[weekday]
      });
      if (weekday === 5 || weekday === 6) {
        header.addClass("weekend");
      }
    }
    const firstDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const firstWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    let dayNumber = 1;
    for (let week = 0; week < 6; week++) {
      const row = table.createEl("tr");
      for (let weekday = 0; weekday < 7; weekday++) {
        const cell = row.createEl("td");
        const position = week * 7 + weekday;
        if (position >= firstWeekday && dayNumber <= daysInMonth) {
          if (weekday === 5 || weekday === 6) {
            cell.addClass("weekend");
          }
          const dayElement = cell.createEl("span", {
            text: String(dayNumber),
            cls: "calendar-day"
          });
          if (dayNumber === now.getDate()) {
            dayElement.addClass("calendar-today");
          }
          dayNumber++;
        }
      }
    }
  };
  updateCalendar();
  window.setInterval(updateCalendar, 1e3);
}

// src/data/RecentFilesData.ts
var import_obsidian2 = require("obsidian");
var DATA_FOLDER = "System/Data";
var DATA_FILE = `${DATA_FOLDER}/recent-files.json`;
async function ensureRecentFilesData(app) {
  const existingFile = app.vault.getAbstractFileByPath(DATA_FILE);
  if (existingFile instanceof import_obsidian2.TFile) {
    return existingFile;
  }
  const systemFolder = app.vault.getAbstractFileByPath("System");
  if (!systemFolder) {
    await app.vault.createFolder("System");
  }
  const dataFolder = app.vault.getAbstractFileByPath(DATA_FOLDER);
  if (!dataFolder) {
    await app.vault.createFolder(DATA_FOLDER);
  }
  const file = await app.vault.create(DATA_FILE, "[]");
  return file;
}
async function readRecentEntries(app) {
  const dataFile = await ensureRecentFilesData(app);
  try {
    const content = await app.vault.cachedRead(dataFile);
    if (!content.trim()) {
      return [];
    }
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (entry) => typeof entry === "object" && entry !== null && "path" in entry && typeof entry.path === "string"
    );
  } catch (error) {
    console.error(
      "Dashboard: \u043F\u043E\u043C\u0438\u043B\u043A\u0430 \u0447\u0438\u0442\u0430\u043D\u043D\u044F recent-files.json",
      error
    );
    return [];
  }
}
async function registerRecentFile(app, file, limit = 10) {
  if (file.path === DATA_FILE) {
    return;
  }
  const entries = await readRecentEntries(app);
  const filtered = entries.filter((entry) => entry.path !== file.path);
  filtered.unshift({ path: file.path });
  const updated = filtered.slice(0, limit);
  const dataFile = await ensureRecentFilesData(app);
  await app.vault.modify(dataFile, JSON.stringify(updated, null, 2));
}
async function getRecentFiles(app, limit = 10) {
  const entries = await readRecentEntries(app);
  const result = [];
  for (const entry of entries) {
    const file = app.vault.getAbstractFileByPath(entry.path);
    if (file instanceof import_obsidian2.TFile) {
      result.push({ file });
      if (result.length >= limit) {
        break;
      }
    }
  }
  return result;
}

// src/components/RecentFiles.ts
async function renderRecentFiles(container, app) {
  const block = container.createDiv({
    cls: "dashboard-block recent-files"
  });
  block.createEl("h2", {
    text: "\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u0444\u0430\u0439\u043B\u0438"
  });
  const files = await getRecentFiles(app, 10);
  if (files.length === 0) {
    block.createEl("p", {
      text: "\u041D\u0435\u0449\u043E\u0434\u0430\u0432\u043D\u0456 \u0444\u0430\u0439\u043B\u0438 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456."
    });
    return;
  }
  for (const entry of files) {
    const item = block.createDiv({ cls: "recent-file-item" });
    const link = item.createEl("a", {
      text: entry.file.basename,
      cls: "internal-link"
    });
    link.dataset.href = entry.file.path;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      void app.workspace.getLeaf(false).openFile(entry.file);
    });
  }
}

// src/data/PlanningData.ts
function toDate(value) {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}
function getTodayEvents(app, limit = 6) {
  const now = /* @__PURE__ */ new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const events = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "event") {
      continue;
    }
    const eventDate = toDate(frontmatter["dt-event"]);
    if (!eventDate) {
      continue;
    }
    if (eventDate >= startOfDay && eventDate < endOfDay) {
      events.push({ file, date: eventDate });
    }
  }
  return events.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, limit);
}
function getActiveDeadlines(app, limit = 6) {
  const deadlines = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "deadline") {
      continue;
    }
    if (frontmatter["deadline-status"] !== "active") {
      continue;
    }
    const deadlineDate = toDate(frontmatter["dt-over-deadline"]);
    if (!deadlineDate) {
      continue;
    }
    deadlines.push({ file, date: deadlineDate });
  }
  return deadlines.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, limit);
}
function getGeneralStatistics(app) {
  const markdownFiles = app.vault.getMarkdownFiles();
  let projects = 0;
  let tasks = 0;
  const tags = /* @__PURE__ */ new Set();
  for (const file of markdownFiles) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if ((frontmatter == null ? void 0 : frontmatter.type) === "project") {
      projects++;
    }
    if ((frontmatter == null ? void 0 : frontmatter.type) === "task") {
      tasks++;
    }
    if (!(cache == null ? void 0 : cache.tags)) {
      continue;
    }
    for (const tagEntry of cache.tags) {
      tags.add(tagEntry.tag);
    }
  }
  return {
    tasks,
    notes: markdownFiles.length,
    tags: tags.size,
    projects
  };
}
function getLibraryStatistics(app) {
  let books = 0;
  let readBooks = 0;
  let categorizedBooks = 0;
  let uncategorizedBooks = 0;
  const categories = /* @__PURE__ */ new Set();
  const formats = /* @__PURE__ */ new Set();
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if ((frontmatter == null ? void 0 : frontmatter.type) !== "book") {
      continue;
    }
    books++;
    const status = frontmatter["book-status"];
    if (status === "Completed") {
      readBooks++;
    }
    const category = frontmatter["book-category"];
    if (Array.isArray(category)) {
      if (category.length > 0) {
        categorizedBooks++;
      } else {
        uncategorizedBooks++;
      }
      for (const item of category) {
        if (typeof item === "string" && item.trim() !== "") {
          categories.add(item);
        }
      }
    } else if (typeof category === "string" && category.trim() !== "") {
      categorizedBooks++;
      categories.add(category);
    } else {
      uncategorizedBooks++;
    }
    const format = frontmatter["format"];
    if (typeof format === "string" && format.trim() !== "") {
      formats.add(format);
    }
  }
  return {
    books,
    readBooks,
    categorizedBooks,
    uncategorizedBooks,
    categories: categories.size,
    formats: formats.size
  };
}

// src/components/PlanningStatistics.ts
function renderPlanningStatistics(container, app) {
  const block = container.createDiv({ cls: "dashboard-block planning-statistics" });
  const grid = block.createDiv({ cls: "planning-grid" });
  const eventsBlock = grid.createDiv({ cls: "planning-subblock planning-events" });
  eventsBlock.createEl("h3", { text: "\u041F\u043E\u0434\u0456\u0457 \u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456" });
  const events = getTodayEvents(app);
  if (events.length === 0) {
    eventsBlock.createEl("p", { text: "\u0417\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u0456 \u043F\u043E\u0434\u0456\u0457 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456." });
  } else {
    const list = eventsBlock.createDiv({ cls: "events-list" });
    for (const event of events) {
      const item = list.createDiv({ cls: "event-item" });
      const link = item.createEl("a", {
        text: event.file.basename,
        cls: "internal-link"
      });
      link.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        void app.workspace.getLeaf(false).openFile(event.file);
      });
      item.createEl("span", {
        text: formatTime(event.date),
        cls: "event-time"
      });
    }
  }
  const deadlinesBlock = grid.createDiv({ cls: "planning-subblock planning-deadlines" });
  deadlinesBlock.createEl("h3", {
    text: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D\u0438"
  });
  const deadlines = getActiveDeadlines(app);
  if (deadlines.length === 0) {
    deadlinesBlock.createEl("p", {
      text: "\u0410\u043A\u0442\u0438\u0432\u043D\u0456 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456."
    });
  } else {
    const list = deadlinesBlock.createDiv({ cls: "deadline-list" });
    for (const deadline of deadlines) {
      const item = list.createDiv({ cls: "deadline-item" });
      const link = item.createEl("a", {
        text: deadline.file.basename,
        cls: "internal-link"
      });
      link.addEventListener("click", (event) => {
        event.preventDefault();
        void app.workspace.getLeaf(false).openFile(deadline.file);
      });
      item.createEl("span", {
        text: formatDateTime(deadline.date),
        cls: "deadline-date"
      });
    }
  }
  const generalBlock = grid.createDiv({ cls: "planning-subblock general-statistics" });
  generalBlock.createEl("h3", { text: "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430" });
  const statistics = getGeneralStatistics(app);
  const statisticsList = generalBlock.createDiv({ cls: "statistics-list" });
  statisticsList.createDiv({
    cls: "statistics-item",
    text: `\u0417\u0430\u0432\u0434\u0430\u043D\u044C: ${statistics.tasks}`
  });
  statisticsList.createDiv({
    cls: "statistics-item",
    text: `\u041F\u0440\u043E\u0454\u043A\u0442\u0456\u0432: ${statistics.projects}`
  });
  statisticsList.createDiv({
    cls: "statistics-item",
    text: `\u041D\u043E\u0442\u0430\u0442\u043E\u043A: ${statistics.notes}`
  });
  statisticsList.createDiv({
    cls: "statistics-item",
    text: `\u0422\u0435\u0433\u0456\u0432: ${statistics.tags}`
  });
  const libraryBlock = grid.createDiv({ cls: "planning-subblock library-statistics" });
  libraryBlock.createEl("h3", { text: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0431\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0438" });
  const library = getLibraryStatistics(app);
  const libraryList = libraryBlock.createDiv({ cls: "statistics-list" });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u0412\u0441\u044C\u043E\u0433\u043E \u043A\u043D\u0438\u0433: ${library.books}`
  });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E \u043A\u043D\u0438\u0433: ${library.readBooks}`
  });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0437\u043E\u0432\u0430\u043D\u043E \u043A\u043D\u0438\u0433: ${library.categorizedBooks}`
  });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u041A\u043D\u0438\u0433 \u0431\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0439: ${library.uncategorizedBooks}`
  });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0439 \u043A\u043D\u0438\u0433: ${library.categories}`
  });
  libraryList.createDiv({
    cls: "statistics-item",
    text: `\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442\u0456\u0432 \u043A\u043D\u0438\u0433: ${library.formats}`
  });
}
function formatTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function formatDateTime(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth()).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// src/data/TasksData.ts
function getTasksByPriority(app, priority, limit = 6) {
  const result = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "task") {
      continue;
    }
    if (frontmatter["task-priority"] !== priority) {
      continue;
    }
    result.push({ file });
    if (result.length >= limit) {
      break;
    }
  }
  return result;
}
function getTasksByStatus(app, status, limit = 5) {
  const result = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "task") {
      continue;
    }
    if (frontmatter["task-status"] !== status) {
      continue;
    }
    result.push({ file });
    if (result.length >= limit) {
      break;
    }
  }
  return result;
}
async function createTask(app, name, priority) {
  const now = /* @__PURE__ */ new Date();
  const pad = (value) => {
    return String(value).padStart(2, "0");
  };
  const createdDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-`;
  const content = `---
    type: task
    task-priority: ${priority}
    task-status: active
    dt-created: ${createdDate}
---
## \u041E\u043F\u0438\u0441
\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u043F\u0438\u0441 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F.

## \u041C\u0435\u0442\u0430
\u041E\u043F\u0438\u0441 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443, \u044F\u043A\u0438\u0439 \u0431\u0443\u0434\u0435 \u0434\u043E\u0441\u044F\u0433\u043D\u0443\u0442\u0438\u0439.

## \u041F\u043E\u0432'\u044F\u0437\u0430\u043D\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442
\u041F\u0440\u043E\u0454\u043A\u0442, \u0434\u043E \u044F\u043A\u043E\u0433\u043E \u043D\u0430\u043B\u0435\u0436\u0438\u0442\u044C \u0434\u0430\u043D\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F.

## \u041F\u043E\u0432'\u044F\u0437\u0430\u043D\u0438\u0439 \u0434\u0435\u0434\u043B\u0430\u0439\u043D
\u0414\u0435\u0434\u043B\u0430\u0439\u043D \u0434\u043E \u044F\u043A\u043E\u0433\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0432\u0438\u043A\u043E\u043D\u0430\u0442\u0438 \u0434\u0430\u043D\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F.

## \u041D\u043E\u0442\u0430\u0442\u043A\u0438
\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0449\u043E\u0434\u043E \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F.
`;
  try {
    const file = await app.vault.create(`${name}.md`, content);
    await app.workspace.getLeaf(false).openFile(file);
  } catch (error) {
    console.error("Failed to create task:", error);
  }
}
function getTasks(app) {
  return {
    high: getTasksByPriority(app, "high", 6),
    normal: getTasksByPriority(app, "normal", 6),
    none: getTasksByPriority(app, "none", 6),
    postponed: getTasksByStatus(app, "postponed", 5),
    waiting: getTasksByStatus(app, "waiting", 5)
  };
}

// src/components/Tasks.ts
function renderTasks(container, app) {
  const block = container.createDiv({ cls: "dashboard-block tasks" });
  const grid = block.createDiv({ cls: "tasks-grid" });
  const tasks = getTasks(app);
  renderPrioritySection(
    grid,
    app,
    "\u0412\u0438\u0441\u043E\u043A\u0438\u0439 \u043F\u0440\u0456\u043E\u0440\u0456\u0442\u0435\u0442",
    "task-high",
    tasks.high
  );
  renderPrioritySection(
    grid,
    app,
    "\u0417\u0432\u0438\u0447\u0430\u0439\u0438\u0439 \u043F\u0440\u0456\u043E\u0440\u0456\u0442\u0435\u0442",
    "task-normal",
    tasks.normal
  );
  renderPrioritySection(
    grid,
    app,
    "\u041F\u043E\u0437\u0430 \u043F\u0440\u0456\u043E\u0440\u0456\u0442\u0435\u0442\u043E\u043C",
    "task-none",
    tasks.none
  );
  renderStatusSection(
    grid,
    app,
    "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0435\u043D\u0456",
    "task-postponed",
    tasks.postponed,
    "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0435\u043D\u0456 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456."
  );
  renderStatusSection(
    grid,
    app,
    "\u0412 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456",
    "task-waiting",
    tasks.waiting,
    "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0432 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456."
  );
}
function renderPrioritySection(grid, app, title, className, tasks) {
  const section = grid.createDiv({ cls: `task-section ${className}` });
  section.createEl("h3", { text: title });
  renderTaskList(section, app, tasks, "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456.");
}
function renderStatusSection(grid, app, title, className, tasks, emptyText) {
  const section = grid.createDiv({ cls: `task-section ${className}` });
  section.createEl("h3", { text: title });
  renderTaskList(section, app, tasks, emptyText);
}
function renderTaskList(section, app, tasks, emptyText) {
  if (tasks.length === 0) {
    section.createEl("p", { text: emptyText, cls: "task-empty" });
    return;
  }
  const list = section.createEl("ol");
  for (const task of tasks) {
    const item = list.createEl("li");
    const link = item.createEl("a", { text: task.file.basename, cls: "internal-link" });
    link.dataset.href = task.file.path;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      void app.workspace.getLeaf(false).openFile(task.file);
    });
  }
}

// src/data/LearningData.ts
function getLearningItems(app, limit = 7) {
  const items = [];
  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    if (!frontmatter) {
      continue;
    }
    if (frontmatter.type !== "learning") {
      continue;
    }
    if (frontmatter.progress === void 0) {
      continue;
    }
    const progress = Number(frontmatter.progress);
    if (!Number.isFinite(progress) || progress >= 100) {
      continue;
    }
    items.push({ file, progress });
  }
  return items.sort((a, b) => b.progress - a.progress).slice(0, limit);
}

// src/components/Learning.ts
function renderLearning(container, app) {
  const block = container.createDiv({ cls: "dashboard-block learning" });
  block.createEl("h2", { text: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F" });
  const items = getLearningItems(app);
  if (items.length === 0) {
    block.createEl("p", { text: "\u0410\u043A\u0442\u0438\u0432\u043D\u0435 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0454." });
    return;
  }
  const list = block.createDiv({ cls: "learning-list" });
  for (const course of items) {
    const item = list.createDiv({ cls: "learning-item" });
    const link = item.createEl("a", { text: course.file.basename, cls: "internal-link" });
    link.dataset.href = course.file.path;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      void app.workspace.getLeaf(false).openFile(course.file);
    });
    item.createEl("span", { text: `${course.progress}%`, cls: "learning-progress" });
  }
}

// src/components/QuickActions.ts
var import_obsidian8 = require("obsidian");

// src/modals/CreateNoteModal.ts
var import_obsidian3 = require("obsidian");
var createNoteModal = class extends import_obsidian3.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0443" });
    const input = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u041D\u0430\u0437\u0432\u0430 \u043D\u043E\u0442\u0430\u0442\u043A\u0438..."
    });
    input.focus();
    const button = contentEl.createEl("button", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438"
    });
    const createNote = () => {
      const name = input.value.trim();
      if (!name) {
        new import_obsidian3.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0438.");
        return;
      }
      this.onSubmit(name);
      this.close();
    };
    button.addEventListener("click", createNote);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        createNote();
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/data/DeadlineData.ts
var import_obsidian4 = require("obsidian");
function formatDateTime2(date) {
  const pad = (value) => {
    return String(value).padStart(2, "0");
  };
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + " " + [
    pad(date.getHours()),
    pad(date.getMinutes())
  ].join(":");
}
async function createDeadline(app, name, date, time) {
  const deadlineDate = `${date} ${time}`;
  const createdDate = formatDateTime2(/* @__PURE__ */ new Date());
  const content = `---
    type: deadline
    deadline-priority: normal
    dt-over-deadline: ${deadlineDate}
    deadline-status: active
    dt-created: ${createdDate}
---

## \u041E\u043F\u0438\u0441
\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u043F\u0438\u0441 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443.

## \u041C\u0435\u0442\u0430
\u041E\u043F\u0438\u0441 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u044F\u043A\u0438\u0439 \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0431\u0443\u0442\u0438 \u0434\u043E\u0441\u044F\u0433\u043D\u0435\u043D\u0438\u043C \u0434\u043E \u0439\u043E\u0433\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F.

## \u041F\u043E\u0432'\u044F\u0437\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438
\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438, \u044F\u043A\u0456 \u0432\u0456\u0434\u043D\u043E\u0441\u044F\u0442\u044C\u0441\u044F \u0434\u043E \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443.

## \u041D\u043E\u0442\u0430\u0442\u043A\u0438
\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0449\u043E\u0434\u043E \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443.
`;
  try {
    const file = await app.vault.create(`${name}.md`, content);
    await app.workspace.getLeaf(false).openFile(file);
    new import_obsidian4.Notice("\u0414\u0435\u0434\u043B\u0430\u0439\u043D \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E.");
  } catch (e) {
    new import_obsidian4.Notice("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0434\u0435\u0434\u043B\u0430\u0439\u043D.");
  }
}

// src/modals/CreateDeadlineModal.ts
var import_obsidian5 = require("obsidian");
var createDeadlineModal = class extends import_obsidian5.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u0434\u0435\u0434\u043B\u0430\u0439\u043D",
      cls: "create-deadline-title"
    });
    contentEl.createEl("label", {
      text: "\u041D\u0430\u0437\u0432\u0430 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443",
      cls: "create-deadline-label"
    });
    const nameInput = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u041D\u0430\u0437\u0432\u0430 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443...",
      cls: "create-deadline-input"
    });
    contentEl.createEl("label", {
      text: "\u041A\u0456\u043D\u0446\u0435\u0432\u0430 \u0434\u0430\u0442\u0430 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F",
      cls: "create-deadline-label"
    });
    const dateInput = contentEl.createEl("input", {
      type: "date",
      cls: "create-deadline-input"
    });
    contentEl.createEl("label", {
      text: "\u041A\u0456\u043D\u0446\u0435\u0432\u0438\u0439 \u0447\u0430\u0441 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F",
      cls: "create-deadline-label"
    });
    const timeInput = contentEl.createEl("input", {
      type: "time",
      cls: "create-deadline-input"
    });
    const button = contentEl.createEl("button", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438",
      cls: "create-deadline-button"
    });
    nameInput.focus();
    const createDeadline2 = () => {
      const name = nameInput.value.trim();
      const date = dateInput.value;
      const time = timeInput.value;
      if (!name) {
        new import_obsidian5.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0443");
        return;
      }
      if (!date) {
        new import_obsidian5.Notice("\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u043A\u0456\u043D\u0446\u0435\u0432\u0443 \u0434\u0430\u0442\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F");
        return;
      }
      if (!time) {
        new import_obsidian5.Notice("\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u043A\u0456\u043D\u0446\u0435\u0432\u0438\u0439 \u0447\u0430\u0441 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F");
        return;
      }
      this.onSubmit(name, date, time);
      this.close();
    };
    button.addEventListener("click", createDeadline2);
    timeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        createDeadline2();
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateProjectModal.ts
var import_obsidian6 = require("obsidian");
var createProjectModal = class extends import_obsidian6.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442",
      cls: "create-project-title"
    });
    contentEl.createEl("label", {
      text: "\u041D\u0430\u0437\u0432\u0430 \u043F\u0440\u043E\u0454\u043A\u0442\u0443",
      cls: "create-project-label"
    });
    const nameInput = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u041D\u0430\u0437\u0432\u0430 \u043F\u0440\u043E\u0454\u043A\u0442\u0443...",
      cls: "create-project-input"
    });
    contentEl.createEl("label", {
      text: "\u0412\u0435\u0440\u0441\u0456\u044F \u043F\u0440\u043E\u0454\u043A\u0442\u0443",
      cls: "create-project-label"
    });
    const versionInput = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u0412\u0435\u0440\u0441\u0456\u044F \u043F\u0440\u043E\u0454\u043A\u0442\u0443...",
      cls: "create-project-input"
    });
    contentEl.createEl("label", {
      text: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u043F\u0440\u043E\u0454\u043A\u0442\u0443",
      cls: "create-project-label"
    });
    const categoryInput = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u043F\u0440\u043E\u0454\u043A\u0442\u0443...",
      cls: "create-project-input"
    });
    const button = contentEl.createEl("button", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438",
      cls: "create-project-button"
    });
    nameInput.focus();
    const createProject2 = () => {
      const name = nameInput.value.trim();
      const version = versionInput.value.trim();
      const category = categoryInput.value.trim();
      if (!name) {
        new import_obsidian6.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u043F\u0440\u043E\u0454\u043A\u0442\u0443");
        return;
      }
      if (!version) {
        new import_obsidian6.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0432\u0435\u0440\u0441\u0456\u044E \u043F\u0440\u043E\u0454\u043A\u0442\u0443");
        return;
      }
      if (!category) {
        new import_obsidian6.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E \u043F\u0440\u043E\u0454\u043A\u0442\u0443");
        return;
      }
      this.onSubmit(name, version, category);
      this.close();
    };
    button.addEventListener("click", createProject2);
    categoryInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        createProject2();
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateTaskModal.ts
var import_obsidian7 = require("obsidian");
var CreateTaskModal = class extends import_obsidian7.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F",
      cls: "create-task-title"
    });
    contentEl.createEl("label", {
      text: "\u041D\u0430\u0437\u0432\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F",
      cls: "create-task-label"
    });
    const nameInput = contentEl.createEl("input", {
      type: "text",
      placeholder: "\u041D\u0430\u0437\u0432\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F...",
      cls: "create-task-input"
    });
    contentEl.createEl("label", {
      text: "\u041F\u0440\u0456\u043E\u0440\u0456\u0442\u0435\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F",
      cls: "create-task-label"
    });
    const prioritySelect = contentEl.createEl("select", {
      cls: "create-task-input"
    });
    prioritySelect.createEl("option", {
      text: "\u0412\u0438\u0441\u043E\u043A\u0438\u0439",
      value: "high"
    });
    prioritySelect.createEl("option", {
      text: "\u0417\u0432\u0438\u0447\u0430\u0439\u043D\u0438\u0439",
      value: "normal"
    });
    prioritySelect.createEl("option", {
      text: "\u041F\u043E\u0437\u0430 \u043F\u0440\u0456\u043E\u0440\u0456\u0442\u0435\u0442\u043E\u043C",
      value: "none"
    });
    prioritySelect.value = "none";
    const button = contentEl.createEl("button", {
      text: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438",
      cls: "create-task-button"
    });
    nameInput.focus();
    const createTask2 = () => {
      const name = nameInput.value.trim();
      const priority = prioritySelect.value;
      if (!name) {
        new import_obsidian7.Notice("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F.");
        return;
      }
      this.onSubmit(name, priority);
      this.close();
    };
    button.addEventListener("click", createTask2);
    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        createTask2();
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/data/SearchData.ts
function searchFiles(app, query) {
  const searchQuery = query.trim().toLowerCase();
  if (!searchQuery) {
    return [];
  }
  return app.vault.getMarkdownFiles().filter(
    (file) => file.basename.toLowerCase().includes(searchQuery)
  );
}

// src/components/QuickActions.ts
function renderQuickActions(container, app) {
  const block = container.createDiv({ cls: "dashboard-block quick-actions" });
  const createPanel = block.createDiv({ cls: "quick-create" });
  const createLeft = createPanel.createDiv({ cls: "quick-create-left" });
  const noteButton = createLeft.createEl("button", {
    text: "+ \u041D\u043E\u0442\u0430\u0442\u043A\u0430",
    cls: "quick-action-button"
  });
  noteButton.setAttribute("title", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0443");
  const deadlineButton = createLeft.createEl("button", {
    text: "+ \u0414\u0435\u0434\u043B\u0430\u0439\u043D",
    cls: "quick-action-button"
  });
  deadlineButton.setAttribute("title", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u0434\u0435\u0434\u043B\u0430\u0439\u043D");
  const searchContainer = createPanel.createDiv({ cls: "quick-search" });
  const searchInput = searchContainer.createEl("input", {
    type: "text",
    placeholder: "\u041F\u043E\u0448\u0443\u043A \u043F\u043E \u0441\u0445\u043E\u0432\u0438\u0449\u0443..."
  });
  const searchResults = searchContainer.createDiv({
    cls: "quick-search-results"
  });
  searchInput.addEventListener("input", () => {
    searchResults.empty();
    const query = searchInput.value.trim();
    if (!query) {
      return;
    }
    const files = searchFiles(app, query);
    for (const file of files) {
      const result = searchResults.createEl("button", {
        text: file.basename,
        cls: "quick-search-result"
      });
      result.addEventListener("click", () => {
        void app.workspace.getLeaf(false).openFile(file);
        searchInput.value = "";
        searchResults.empty();
      });
    }
  });
  const createRight = createPanel.createDiv({ cls: "quick-create-right" });
  const projectButton = createRight.createEl("button", {
    text: "+ \u041F\u0440\u043E\u0454\u043A\u0442\u0438",
    cls: "quick-action-button"
  });
  projectButton.setAttribute("title", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442");
  const taskButton = createRight.createEl("button", {
    text: "+ \u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F",
    cls: "quick-action-button"
  });
  taskButton.setAttribute("title", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
  const navigationPanel = block.createDiv({ cls: "quick-navigation" });
  const statisticsButton = navigationPanel.createEl("button", {
    text: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
    cls: "quick-navigation-button"
  });
  statisticsButton.setAttribute("title", "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443");
  const libraryButton = navigationPanel.createEl("button", {
    text: "\u0411\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0430",
    cls: "quick-navigation-button"
  });
  libraryButton.setAttribute("title", "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0431\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0443");
  const settingsButton = navigationPanel.createEl("button", {
    text: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",
    cls: "quick-navigation-button"
  });
  settingsButton.setAttribute("title", "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F");
  noteButton.addEventListener("click", () => {
    new createNoteModal(app, async (name) => {
      try {
        const file = await app.vault.create(`${name}.md`, "");
        await app.workspace.getLeaf(false).openFile(file);
      } catch (e) {
        new import_obsidian8.Notice("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443.");
      }
    }).open();
  });
  deadlineButton.addEventListener("click", () => {
    new createDeadlineModal(app, async (name, date, time) => {
      await createDeadline(app, name, date, time);
    }).open();
  });
  projectButton.addEventListener("click", () => {
    new createProjectModal(app, async (name, version, category) => {
      await createProject(app, name, version, category);
    }).open();
  });
  taskButton.addEventListener("click", () => {
    new CreateTaskModal(app, async (name, priority) => {
      await createTask(app, name, priority);
    }).open();
  });
  statisticsButton.addEventListener("click", () => {
    new import_obsidian8.Notice("\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456.");
  });
  libraryButton.addEventListener("click", () => {
    new import_obsidian8.Notice("\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456.");
  });
  settingsButton.addEventListener("click", () => {
    new import_obsidian8.Notice("\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456.");
  });
  void app;
}

// src/main.ts
var VIEW_TYPE_DASHBOARD = "dashboard-view";
var DashboardView = class extends import_obsidian9.ItemView {
  constructor(leaf, version) {
    super(leaf);
    this.version = version;
  }
  getViewType() {
    return VIEW_TYPE_DASHBOARD;
  }
  getDisplayText() {
    return "Dashboard";
  }
  async refreshRecentFiles() {
    const container = this.containerEl.querySelector(
      ".dashboard-slot-recent-files"
    );
    if (!(container instanceof HTMLElement)) {
      return;
    }
    container.empty();
    await renderRecentFiles(container, this.app);
  }
  async onOpen() {
    const container = this.containerEl;
    container.empty();
    container.addClass("dashboard-view");
    const dashboard = container.createDiv({
      cls: "dashboard"
    });
    const projects = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-projects"
    });
    const currentProject = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-current-project"
    });
    const calendar = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-calendar"
    });
    const recentFiles = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-recent-files"
    });
    const middleColumn = dashboard.createDiv({
      cls: "dashboard-slot-middle"
    });
    const planning = middleColumn.createDiv({
      cls: "dashboard-slot dashboard-slot-planning"
    });
    const tasks = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-tasks"
    });
    const learning = dashboard.createDiv({
      cls: "dashboard-slot dashboard-slot-learning"
    });
    const quickActions = middleColumn.createDiv({
      cls: "dashboard-slot dashboard-slot-quick-actions"
    });
    const quickActionsFooter = middleColumn.createDiv({
      cls: "quick-action-footer"
    });
    const authorLicense = quickActionsFooter.createDiv({
      cls: "dashboard-author-license"
    });
    authorLicense.setText("Atlantus Future System / MIT License");
    const version = quickActionsFooter.createDiv({
      cls: "dashboard-version"
    });
    version.setText(`Dashboard v${this.version}`);
    renderProjects(projects, this.app);
    renderCurrentProject(currentProject, this.app);
    renderCalendar(calendar);
    await renderRecentFiles(recentFiles, this.app);
    renderPlanningStatistics(planning, this.app);
    renderTasks(tasks, this.app);
    renderLearning(learning, this.app);
    renderQuickActions(quickActions, this.app);
  }
  async onClose() {
  }
};
var DashboardPlugin = class extends import_obsidian9.Plugin {
  async onload() {
    this.registerView(
      VIEW_TYPE_DASHBOARD,
      (leaf) => new DashboardView(leaf, this.manifest.version)
    );
    this.registerEvent(
      this.app.workspace.on(
        "file-open",
        (file) => {
          if (!file) {
            return;
          }
          void (async () => {
            await registerRecentFile(this.app, file);
            const leaves = this.app.workspace.getLeavesOfType(
              VIEW_TYPE_DASHBOARD
            );
            for (const leaf of leaves) {
              if (leaf.view instanceof DashboardView) {
                await leaf.view.refreshRecentFiles();
              }
            }
          })();
        }
      )
    );
    this.addCommand({
      id: "open-dashboard",
      name: "Open Dashboard",
      callback: () => {
        this.activateView();
      }
    });
  }
  async onunload() {
  }
  async activateView() {
    const existingLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_DASHBOARD);
    if (existingLeaves.length > 0) {
      this.app.workspace.revealLeaf(existingLeaves[0]);
      return;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({
      type: VIEW_TYPE_DASHBOARD,
      active: true
    });
    this.app.workspace.revealLeaf(leaf);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2NvbXBvbmVudHMvUHJvamVjdC50cyIsICJzcmMvZGF0YS9Qcm9qZWN0RGF0YS50cyIsICJzcmMvY29tcG9uZW50cy9DdXJyZW50UHJvamVjdC50cyIsICJzcmMvY29tcG9uZW50cy9DYWxlbmRhci50cyIsICJzcmMvZGF0YS9SZWNlbnRGaWxlc0RhdGEudHMiLCAic3JjL2NvbXBvbmVudHMvUmVjZW50RmlsZXMudHMiLCAic3JjL2RhdGEvUGxhbm5pbmdEYXRhLnRzIiwgInNyYy9jb21wb25lbnRzL1BsYW5uaW5nU3RhdGlzdGljcy50cyIsICJzcmMvZGF0YS9UYXNrc0RhdGEudHMiLCAic3JjL2NvbXBvbmVudHMvVGFza3MudHMiLCAic3JjL2RhdGEvTGVhcm5pbmdEYXRhLnRzIiwgInNyYy9jb21wb25lbnRzL0xlYXJuaW5nLnRzIiwgInNyYy9jb21wb25lbnRzL1F1aWNrQWN0aW9ucy50cyIsICJzcmMvbW9kYWxzL0NyZWF0ZU5vdGVNb2RhbC50cyIsICJzcmMvZGF0YS9EZWFkbGluZURhdGEudHMiLCAic3JjL21vZGFscy9DcmVhdGVEZWFkbGluZU1vZGFsLnRzIiwgInNyYy9tb2RhbHMvQ3JlYXRlUHJvamVjdE1vZGFsLnRzIiwgInNyYy9tb2RhbHMvQ3JlYXRlVGFza01vZGFsLnRzIiwgInNyYy9kYXRhL1NlYXJjaERhdGEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFxuICAgIEl0ZW1WaWV3LFxuICAgIFBsdWdpbixcbiAgICBXb3Jrc3BhY2VMZWFmXG4gfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2plY3RcIjtcbmltcG9ydCB7IHJlbmRlckN1cnJlbnRQcm9qZWN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9DdXJyZW50UHJvamVjdFwiO1xuaW1wb3J0IHsgcmVuZGVyQ2FsZW5kYXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0NhbGVuZGFyXCI7XG5pbXBvcnQgeyByZWdpc3RlclJlY2VudEZpbGUgfSBmcm9tIFwiLi9kYXRhL1JlY2VudEZpbGVzRGF0YVwiO1xuaW1wb3J0IHsgcmVuZGVyUmVjZW50RmlsZXMgfSBmcm9tIFwiLi9jb21wb25lbnRzL1JlY2VudEZpbGVzXCI7XG5pbXBvcnQgeyByZW5kZXJQbGFubmluZ1N0YXRpc3RpY3MgfSBmcm9tIFwiLi9jb21wb25lbnRzL1BsYW5uaW5nU3RhdGlzdGljc1wiO1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Rhc2tzXCI7XG5pbXBvcnQgeyByZW5kZXJMZWFybmluZyB9IGZyb20gXCIuL2NvbXBvbmVudHMvTGVhcm5pbmdcIjtcbmltcG9ydCB7IHJlbmRlclF1aWNrQWN0aW9ucyB9IGZyb20gXCIuL2NvbXBvbmVudHMvUXVpY2tBY3Rpb25zXCI7XG5cbiBjb25zdCBWSUVXX1RZUEVfREFTSEJPQVJEID0gXCJkYXNoYm9hcmQtdmlld1wiO1xuXG4gY2xhc3MgRGFzaGJvYXJkVmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgICBwcml2YXRlIHZlcnNpb24gOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCB2ZXJzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobGVhZik7XG5cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0RBU0hCT0FSRDtcbiAgICB9XG5cbiAgICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCJEYXNoYm9hcmRcIjtcbiAgICB9XG5cbiAgICBhc3luYyByZWZyZXNoUmVjZW50RmlsZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWwucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiLmRhc2hib2FyZC1zbG90LXJlY2VudC1maWxlc1wiXG4gICAgICAgICk7XG4gICAgICAgIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICAgICAgYXdhaXQgcmVuZGVyUmVjZW50RmlsZXMoY29udGFpbmVyLCB0aGlzLmFwcCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBvbk9wZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWw7XG5cbiAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwiZGFzaGJvYXJkLXZpZXdcIik7XG5cbiAgICAgICAgY29uc3QgZGFzaGJvYXJkID0gY29udGFpbmVyLmNyZWF0ZURpdih7XG4gICAgICAgICAgICBjbHM6IFwiZGFzaGJvYXJkXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vIFx1MDQxMlx1MDQxNVx1MDQyMFx1MDQyNVx1MDQxRFx1MDQwNlx1MDQxOSBcdTA0MjBcdTA0MkZcdTA0MTRcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZGFzaGJvYXJkLmNyZWF0ZURpdih7XG4gICAgICAgICAgICBjbHM6IFwiZGFzaGJvYXJkLXNsb3QgZGFzaGJvYXJkLXNsb3QtcHJvamVjdHNcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRhc2hib2FyZC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1zbG90IGRhc2hib2FyZC1zbG90LWN1cnJlbnQtcHJvamVjdFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyID0gZGFzaGJvYXJkLmNyZWF0ZURpdih7XG4gICAgICAgICAgICBjbHM6IFwiZGFzaGJvYXJkLXNsb3QgZGFzaGJvYXJkLXNsb3QtY2FsZW5kYXJcIlxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBcdTA0MjFcdTA0MTVcdTA0MjBcdTA0MTVcdTA0MTRcdTA0MURcdTA0MDZcdTA0MTkgXHUwNDIwXHUwNDJGXHUwNDE0XG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBjb25zdCByZWNlbnRGaWxlcyA9IGRhc2hib2FyZC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1zbG90IGRhc2hib2FyZC1zbG90LXJlY2VudC1maWxlc1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG1pZGRsZUNvbHVtbiA9IGRhc2hib2FyZC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1zbG90LW1pZGRsZVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYW5uaW5nID0gbWlkZGxlQ29sdW1uLmNyZWF0ZURpdih7XG4gICAgICAgICAgICBjbHM6IFwiZGFzaGJvYXJkLXNsb3QgZGFzaGJvYXJkLXNsb3QtcGxhbm5pbmdcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB0YXNrcyA9IGRhc2hib2FyZC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1zbG90IGRhc2hib2FyZC1zbG90LXRhc2tzXCJcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gXHUwNDFEXHUwNDE4XHUwNDE2XHUwNDFEXHUwNDA2XHUwNDE5IFx1MDQyMFx1MDQyRlx1MDQxNFxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgY29uc3QgbGVhcm5pbmcgPSBkYXNoYm9hcmQuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIGNsczogXCJkYXNoYm9hcmQtc2xvdCBkYXNoYm9hcmQtc2xvdC1sZWFybmluZ1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHF1aWNrQWN0aW9ucyA9IG1pZGRsZUNvbHVtbi5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1zbG90IGRhc2hib2FyZC1zbG90LXF1aWNrLWFjdGlvbnNcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBxdWlja0FjdGlvbnNGb290ZXIgPSBtaWRkbGVDb2x1bW4uY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIGNsczogXCJxdWljay1hY3Rpb24tZm9vdGVyXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYXV0aG9yTGljZW5zZSA9IHF1aWNrQWN0aW9uc0Zvb3Rlci5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgY2xzOiBcImRhc2hib2FyZC1hdXRob3ItbGljZW5zZVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF1dGhvckxpY2Vuc2Uuc2V0VGV4dChcIkF0bGFudHVzIEZ1dHVyZSBTeXN0ZW0gLyBNSVQgTGljZW5zZVwiKTtcblxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gcXVpY2tBY3Rpb25zRm9vdGVyLmNyZWF0ZURpdih7XG4gICAgICAgICAgICBjbHM6IFwiZGFzaGJvYXJkLXZlcnNpb25cIlxuICAgICAgICB9KTtcblxuICAgICAgICB2ZXJzaW9uLnNldFRleHQoYERhc2hib2FyZCB2JHt0aGlzLnZlcnNpb259YCk7XG5cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gXHUwNDIyXHUwNDE4XHUwNDFDXHUwNDI3XHUwNDEwXHUwNDIxXHUwNDFFXHUwNDEyXHUwNDE4XHUwNDE5IFx1MDQxMlx1MDQxQ1x1MDQwNlx1MDQyMVx1MDQyMlxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgcmVuZGVyUHJvamVjdHMocHJvamVjdHMsIHRoaXMuYXBwKTtcblxuICAgICAgICByZW5kZXJDdXJyZW50UHJvamVjdChjdXJyZW50UHJvamVjdCwgdGhpcy5hcHApO1xuXG4gICAgICAgIHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyKTtcblxuICAgICAgICBhd2FpdCByZW5kZXJSZWNlbnRGaWxlcyhyZWNlbnRGaWxlcywgdGhpcy5hcHApO1xuXG4gICAgICAgIHJlbmRlclBsYW5uaW5nU3RhdGlzdGljcyhwbGFubmluZywgdGhpcy5hcHApO1xuXG4gICAgICAgIHJlbmRlclRhc2tzKHRhc2tzLCB0aGlzLmFwcCk7XG5cbiAgICAgICAgcmVuZGVyTGVhcm5pbmcobGVhcm5pbmcsIHRoaXMuYXBwKTtcblxuICAgICAgICByZW5kZXJRdWlja0FjdGlvbnMocXVpY2tBY3Rpb25zLCB0aGlzLmFwcCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIG9uQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIFxuICAgIH1cbiB9XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmRQbHVnaW4gZXh0ZW5kcyBQbHVnaW57XG5cbiAgICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlldyhcbiAgICAgICAgICAgIFZJRVdfVFlQRV9EQVNIQk9BUkQsXG4gICAgICAgICAgICAobGVhZikgPT4gbmV3IERhc2hib2FyZFZpZXcobGVhZiwgdGhpcy5tYW5pZmVzdC52ZXJzaW9uKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbihcbiAgICAgICAgICAgICAgICBcImZpbGUtb3BlblwiLCAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZWdpc3RlclJlY2VudEZpbGUodGhpcy5hcHAsIGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWF2ZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZJRVdfVFlQRV9EQVNIQk9BUkRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxlYWYgb2YgbGVhdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgRGFzaGJvYXJkVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBsZWFmLnZpZXcucmVmcmVzaFJlY2VudEZpbGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJvcGVuLWRhc2hib2FyZFwiLFxuICAgICAgICAgICAgbmFtZTogXCJPcGVuIERhc2hib2FyZFwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRlVmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBvbnVubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgYXN5bmMgYWN0aXZhdGVWaWV3KCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nTGVhdmVzID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfREFTSEJPQVJEKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdMZWF2ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKGV4aXN0aW5nTGVhdmVzWzBdKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWFmKHRydWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogVklFV19UWVBFX0RBU0hCT0FSRCxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgICB9XG4gfVxuIiwgImltcG9ydCB7IEFwcCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBnZXRQcm9qZWN0cyB9IGZyb20gXCIuLi9kYXRhL1Byb2plY3REYXRhXCI7XG5cbiBleHBvcnQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBhcHA6IEFwcFxuICk6IHZvaWQge1xuXG4gICAgY29uc3QgYmxvY2sgPSBjb250YWluZXIuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcImRhc2hib2FyZC1ibG9jayBwcm9qZWN0c1wiXG4gICAgfSk7XG5cbiAgICBjb25zdCBncmlkID0gYmxvY2suY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInByb2plY3RzLWdyaWRcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgcGxhbm5lZCA9IGdyaWQuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInByb2plY3Qtc2VjdGlvbiBwbGFubmVkLXByb2plY3RzXCJcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGdyaWQuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInByb2plY3Qtc2VjdGlvbiBjb21wbGV0ZWQtcHJvamVjdHNcIlxuICAgIH0pO1xuXG4gICAgcmVuZGVyUHJvamVjdFNlY3Rpb24oXG4gICAgICAgIHBsYW5uZWQsXG4gICAgICAgIFwiXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDU2IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQzOFwiLFxuICAgICAgICBcInBsYW5uaW5nXCIsXG4gICAgICAgIFwiXHUwNDFGXHUwNDNFXHUwNDNBXHUwNDMwXHUwNDM3XHUwNDMwXHUwNDQyXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQ1NiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0MzhcIixcbiAgICAgICAgYXBwXG4gICAgKTtcblxuICAgIHJlbmRlclByb2plY3RTZWN0aW9uKFxuICAgICAgICBjb21wbGV0ZWQsXG4gICAgICAgIFwiXHUwNDE3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDU2IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQzOFwiLFxuICAgICAgICBcImNvbXBsZXRlZFwiLFxuICAgICAgICBcIlx1MDQxMlx1MDQ1Nlx1MDQzNFx1MDQzQVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0MzBcdTA0NDBcdTA0NDVcdTA0NTZcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDU2XHUwNDMyXCIsXG4gICAgICAgIGFwcFxuICAgICk7XG4gfVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0U2VjdGlvbihcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgc3RhdHVzOiBzdHJpbmcsXG4gICAgYnV0dG9uVGV4dDogc3RyaW5nLFxuICAgIGFwcDogQXBwXG4pOiB2b2lkIHtcbiAgICBcbiAgICBjb250YWluZXIuY3JlYXRlRWwoXCJoMlwiLCB7XG4gICAgICAgIHRleHQ6IHRpdGxlXG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3RzKGFwcClcbiAgICAgICAgLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3Quc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAgIC5zbGljZSgwLCA4KTtcblxuICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0MzggXHUwNDMyXHUwNDU2XHUwNDM0XHUwNDQxXHUwNDQzXHUwNDQyXHUwNDNEXHUwNDU2LlwiXG4gICAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpc3QgPSBjb250YWluZXIuY3JlYXRlRWwoXCJvbFwiKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcblxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY3JlYXRlRWwoXCJsaVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgbGluayA9IGl0ZW0uY3JlYXRlRWwoXCJhXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBwcm9qZWN0LnRpdGxlLFxuICAgICAgICAgICAgICAgIGNsczogXCJpbnRlcm5hbC1saW5rXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdm9pZCBhcHAud29ya3NwYWNlXG4gICAgICAgICAgICAgICAgICAgIC5nZXRMZWFmKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAub3BlbkZpbGUocHJvamVjdC5maWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uID0gY29udGFpbmVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgdGV4dDogYnV0dG9uVGV4dCxcbiAgICAgICAgY2xzOiBcInByb2plY3QtYWN0aW9uLWJ1dHRvblwiXG4gICAgfSk7XG5cbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgc3RhdHVzID09PSBcInBsYW5uaW5nXCIgP1xuICAgICAgICBcIlx1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzM1x1MDQzQlx1MDQ0Rlx1MDQzRFx1MDQ0M1x1MDQ0Mlx1MDQzOCBcdTA0MzJcdTA0NDFcdTA0NTYgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDU2IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQzOFwiIDogXCJcdTA0MTJcdTA0NTZcdTA0MzRcdTA0M0FcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzggXHUwNDMwXHUwNDQwXHUwNDQ1XHUwNDU2XHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0NSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NTZcdTA0MzJcIlxuICAgICk7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbmV3IE5vdGljZShcIlx1MDQyNFx1MDQ0M1x1MDQzRFx1MDQzQVx1MDQ0Nlx1MDQ1Nlx1MDQzRVx1MDQzRFx1MDQzMFx1MDQzQiBcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzhcdTA0NDJcdTA0NENcdTA0NDFcdTA0NEYgXHUwNDMyIFx1MDQ0MFx1MDQzRVx1MDQzN1x1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0Nlx1MDQ1Ni5cIik7XG4gICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RJdGVtIHtcbiAgICBmaWxlOiBURmlsZTtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHBoYXNlPzogc3RyaW5nO1xuICAgIHBoYXNlTmFtZT86IHN0cmluZztcbiAgICBwaGFzZVByb2dyZXNzPzogbnVtYmVyO1xuICAgIHByb2plY3RQcm9ncmVzcz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0UGhhc2Uge1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgUFJPSkVDVF9QSEFTRVM6IFByb2plY3RQaGFzZVtdID0gW1xuICAgIHtjb2RlOiBcIlBQSDAwMVwiLCBuYW1lOiBcInByb2plY3QtaW5pdFwiLCB0ZXh0OiBcIlx1MDQwNlx1MDQzRFx1MDQ1Nlx1MDQ0Nlx1MDQ1Nlx1MDQzMFx1MDQzQlx1MDQ1Nlx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQ1Nlx1MDQ0RlwifSxcbiAgICB7Y29kZTogXCJQUEgwMDJcIiwgbmFtZTogXCJwcm9qZWN0LXBsYW5cIiwgdGV4dDogXCJcdTA0MUZcdTA0M0JcdTA0MzBcdTA0M0RcdTA0NDNcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIn0sXG4gICAge2NvZGU6IFwiUFBIMDAzXCIsIG5hbWU6IFwicHJvamVjdC1kZXNpZ25cIiwgdGV4dDogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NDNcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIn0sXG4gICAge2NvZGU6IFwiUFBIMDA0XCIsIG5hbWU6IFwicHJvamVjdC1kZXZcIiwgdGV4dDogXCJcdTA0MjBcdTA0M0VcdTA0MzdcdTA0NDBcdTA0M0VcdTA0MzFcdTA0M0FcdTA0MzBcIn0sXG4gICAge2NvZGU6IFwiUFBIMDA1XCIsIG5hbWU6IFwicHJvamVjdC10ZXN0XCIsIHRleHQ6IFwiXHUwNDIyXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDQzXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGXCJ9LFxuICAgIHtjb2RlOiBcIlBQSDAwNlwiLCBuYW1lOiBcInByb2plY3QtY29tcGxldGVcIiwgdGV4dDogXCJcdTA0MTdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEYgXHUwNDU2IFx1MDQzMFx1MDQ0MFx1MDQ0NVx1MDQ1Nlx1MDQzMlx1MDQ0M1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwifVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RzKGFwcDogQXBwKTogUHJvamVjdEl0ZW1bXSB7XG4gICAgY29uc3QgcHJvamVjdHM6IFByb2plY3RJdGVtW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuICAgICAgICBjb25zdCBmcm9udG1hdHRlciA9IGNhY2hlPy5mcm9udG1hdHRlcjtcblxuICAgICAgICBpZiAoIWZyb250bWF0dGVyKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9udG1hdHRlci50eXBlICE9PSBcInByb2plY3RcIikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICB0aXRsZTogZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgIHN0YXR1czogU3RyaW5nKGZyb250bWF0dGVyLnN0YXR1cyA/PyBcIlwiKSxcbiAgICAgICAgICAgIHBoYXNlOiBmcm9udG1hdHRlci5waGFzZSA/IFN0cmluZyhmcm9udG1hdHRlci5waGFzZSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwaGFzZU5hbWU6IGZyb250bWF0dGVyW1wicGhhc2UtbmFtZVwiXSA/IFN0cmluZyhmcm9udG1hdHRlcltcInBoYXNlLW5hbWVcIl0pIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcGhhc2VQcm9ncmVzczogZnJvbnRtYXR0ZXJbXCJwaGFzZS1wcm9ncmVzc1wiXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBOdW1iZXIoZnJvbnRtYXR0ZXJbXCJwaGFzZS1wcm9ncmVzc1wiXSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qZWN0UHJvZ3Jlc3M6IGZyb250bWF0dGVyW1wicHJvamVjdC1wcm9ncmVzc1wiXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBOdW1iZXIoZnJvbnRtYXR0ZXJbXCJwcm9qZWN0LXByb2dyZXNzXCJdKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2plY3RzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdFBoYXNlKG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFByb2plY3RQaGFzZSB8IG51bGwge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gUFJPSkVDVF9QSEFTRVMuZmluZChwaGFzZSA9PiBwaGFzZS5uYW1lID09PSBuYW1lKSA/PyBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChcbiAgICBhcHA6IEFwcCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdmVyc2lvbjogc3RyaW5nLFxuICAgIGNhdGVnb3J5OiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICAgIFxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBwYWQgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlZERhdGUgPVxuICAgIGAke25vdy5nZXRGdWxsWWVhcigpfS1gICtcbiAgICBgJHtwYWQobm93LmdldE1vbnRoKCkgKyAxKX0tYCArXG4gICAgYCR7cGFkKG5vdy5nZXREYXRlKCkpfS1gICtcbiAgICBgJHtwYWQobm93LmdldEhvdXJzKCkpfS1gICtcbiAgICBgJHtwYWQobm93LmdldE1pbnV0ZXMoKSl9LWA7XG5cbiAgICBjb25zdCBjb250ZW50ID1cbiAgICBgLS0tXG4gICAgdHlwZTogcHJvamVjdFxuICAgIHN0YXR1czogcGxhbm5pbmdcbiAgICBwaGFzZTogUFBIMDAxXG4gICAgcGhhc2UtbmFtZTogcHJvamVjdC1pbml0XG4gICAgcHJvamVjdC1jYXRlZ29yeTogJHtjYXRlZ29yeX1cbiAgICBkdC1jcmVhdGVkOiAke2NyZWF0ZWREYXRlfVxuICAgIGR0LW1vZGlmaWVkOlxuICAgIGR0LWNvbXBsZXRlZDpcbiAgICB2ZXJzaW9uOiAke3ZlcnNpb259XG4tLS1cblxuIyMgXHUwNDFFXHUwNDNGXHUwNDM4XHUwNDQxXG5cdTA0MUVcdTA0M0ZcdTA0MzhcdTA0NDEgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzLlxuXG4jIyBcdTA0MUNcdTA0MzVcdTA0NDJcdTA0MzBcblx1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NDMuXG5cbiMjIFx1MDQxNVx1MDQ0Mlx1MDQzMFx1MDQzRlx1MDQzOFxuXHUwNDIxXHUwNDNGXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDNBIFx1MDQzNVx1MDQ0Mlx1MDQzMFx1MDQzRlx1MDQ1Nlx1MDQzMiBcdTA0NDBcdTA0MzVcdTA0MzBcdTA0M0JcdTA0NTZcdTA0MzdcdTA0MzBcdTA0NDZcdTA0NTZcdTA0NTcgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzLlxuXG4jIyBcdTA0MTRcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NDJcdTA0MzBcdTA0NDZcdTA0NTZcdTA0NEZcblx1MDQxNFx1MDQzRVx1MDQzQVx1MDQ0M1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzMFx1MDQ0Nlx1MDQ1Nlx1MDQ0RiBcdTA0M0ZcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzLlxuXG4jIyBcdTA0MTdcdTA0MzBcdTA0MzJcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcblx1MDQxRlx1MDQzRVx1MDQzMidcdTA0NEZcdTA0MzdcdTA0MzBcdTA0M0RcdTA0NTYgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGIFx1MDQzNyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0M0VcdTA0M0MuXG5cbiMjIFx1MDQxRFx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQzOFxuXHUwNDE0XHUwNDNFXHUwNDM0XHUwNDMwXHUwNDQyXHUwNDNBXHUwNDNFXHUwNDMyXHUwNDMwIFx1MDQ1Nlx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQ1Nlx1MDQ0RiBcdTA0NDlcdTA0M0VcdTA0MzRcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzLlxuYDtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBhd2FpdCBhcHAudmF1bHQuY3JlYXRlKGAke25hbWV9Lm1kYCwgY29udGVudCk7XG5cbiAgICAgICAgYXdhaXQgYXBwLndvcmtzcGFjZS5nZXRMZWFmKGZhbHNlKS5vcGVuRmlsZShmaWxlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBwcm9qZWN0OlwiLCBlcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFByb2plY3QoYXBwOiBBcHApOiBQcm9qZWN0SXRlbSB8IG51bGwge1xuICAgIHJldHVybiAoXG4gICAgICAgIGdldFByb2plY3RzKGFwcClcbiAgICAgICAgICAgIC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5zdGF0dXMgPT09IFwiY3VycmVudFwiKSA/PyBudWxsXG4gICAgKTtcbn0iLCAiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50UHJvamVjdCwgZ2V0UHJvamVjdFBoYXNlIH0gZnJvbSBcIi4uL2RhdGEvUHJvamVjdERhdGFcIjtcblxuZnVuY3Rpb24gZ2V0UGhhc2VOdW1iZXIocGhhc2U6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgaWYgKCFwaGFzZSkge1xuICAgICAgICByZXR1cm4gXCItXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhOdW1iZXIocGhhc2UucmVwbGFjZShcIlBQSFwiLCBcIlwiKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ3VycmVudFByb2plY3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgYXBwOiBBcHApOiB2b2lkIHtcbiAgICBcbiAgICBjb25zdCBibG9jayA9IGNvbnRhaW5lci5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwiZGFzaGJvYXJkLWJsb2NrIGN1cnJlbnQtcHJvamVjdFwiXG4gICAgfSk7XG5cblxuICAgIGNvbnN0IHByb2plY3QgPSBnZXRDdXJyZW50UHJvamVjdChhcHApO1xuICAgIGNvbnN0IHBoYXNlID0gZ2V0UHJvamVjdFBoYXNlKHByb2plY3Q/LnBoYXNlTmFtZSk7XG5cbiAgICBpZiAoIXByb2plY3QpIHtcbiAgICAgICAgYmxvY2suY3JlYXRlRWwoXCJoMlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQxRlx1MDQzRVx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcIixcbiAgICAgICAgICAgIGNsczogXCJjdXJyZW50LXByb2plY3QtdGl0bGVcIlxuICAgICAgICB9KTtcblxuICAgICAgICBibG9jay5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTA0MUZcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyIFx1MDQzMlx1MDQ1Nlx1MDQzNFx1MDQ0MVx1MDQ0M1x1MDQ0Mlx1MDQzRFx1MDQ1Nlx1MDQzOS5cIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGl0bGUgPSBibG9jay5jcmVhdGVFbChcImgyXCIsIHtcbiAgICAgICAgY2xzOiBcImN1cnJlbnQtcHJvamVjdC10aXRsZVwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBsaW5rID0gdGl0bGUuY3JlYXRlRWwoXCJhXCIsIHtcbiAgICAgICAgdGV4dDogcHJvamVjdC50aXRsZSxcbiAgICAgICAgY2xzOiBcImludGVybmFsLWxpbmtcIlxuICAgIH0pO1xuXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdm9pZCBhcHAud29ya3NwYWNlXG4gICAgICAgICAgICAuZ2V0TGVhZihmYWxzZSlcbiAgICAgICAgICAgIC5vcGVuRmlsZShwcm9qZWN0LmZpbGUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBibG9jay5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwiY3VycmVudC1wcm9qZWN0LWluZm9cIlxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gcHJvamVjdEluZm8uY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgY2xzOiBgcHJvamVjdC1zdGF0dXMgc3RhdHVzLSR7cHJvamVjdC5zdGF0dXN9YFxuICAgIH0pO1xuXG4gICAgc3RhdHVzLmNyZWF0ZVNwYW4oe3RleHQ6IFwiXHUwNDIxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDQzXHUwNDQxOiBcIn0pO1xuICAgIHN0YXR1cy5jcmVhdGVTcGFuKHtcbiAgICAgICAgdGV4dDogcHJvamVjdC5zdGF0dXMudG9VcHBlckNhc2UoKSxcbiAgICAgICAgY2xzOiBcInByb2plY3Qtc3RhdHVzLXZhbHVlXCJcbiAgICB9KTtcblxuICAgIHByb2plY3RJbmZvLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgIHRleHQ6IGBcdTA0MjRcdTA0MzBcdTA0MzdcdTA0MzAgXHUyMTE2JHtnZXRQaGFzZU51bWJlcihwcm9qZWN0LnBoYXNlKX06ICR7cGhhc2U/LnRleHQgPz8gXCItXCJ9YFxuICAgIH0pO1xuXG4gICAgcHJvamVjdEluZm8uY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgdGV4dDogYFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MSBcdTA0NDRcdTA0MzBcdTA0MzdcdTA0Mzg6ICR7cHJvamVjdC5waGFzZVByb2dyZXNzID8/IDB9JWBcbiAgICB9KTtcblxuICAgIHByb2plY3RJbmZvLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgIHRleHQ6IGBcdTA0MUZcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0RcdTA0NTYgXHUwNDQ2XHUwNDU2XHUwNDNCXHUwNDU2OiBcdTA0MTIgXHUwNDQwXHUwNDNFXHUwNDM3XHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQ2XHUwNDU2LiBcdTA0MTFcdTA0NDNcdTA0MzRcdTA0MzUgXHUwNDMyIFx1MDQzQ1x1MDQzMFx1MDQzOVx1MDQzMVx1MDQ0M1x1MDQ0Mlx1MDQzRFx1MDQ1Nlx1MDQ0NSBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDFcdTA0NTZcdTA0NEZcdTA0NDVgXG4gICAgfSk7XG5cbiAgICBwcm9qZWN0SW5mby5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICB0ZXh0OiBgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQ0MzogJHtwcm9qZWN0LnByb2plY3RQcm9ncmVzcyA/PyAwfSVgXG4gICAgfSk7XG5cbn0iLCAiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKFxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbik6IHZvaWQge1xuICAgIFxuICAgIGNvbnN0IGJsb2NrID0gY29udGFpbmVyLmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJkYXNoYm9hcmQtYmxvY2sgY2FsZW5kYXJcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBibG9jay5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwiY2FsZW5kYXItY3VycmVudC1kYXRlXCJcbiAgICB9KTtcblxuICAgIGNvbnN0IHRhYmxlID0gYmxvY2suY3JlYXRlRWwoXCJ0YWJsZVwiLCB7XG4gICAgICAgIGNsczogXCJkYXNoYm9hcmQtY2FsZW5kYXJcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgbW9udGhOYW1lcyA9IFtcbiAgICAgICAgXCJcdTA0MjFcdTA0NTZcdTA0NDdcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MUJcdTA0NEVcdTA0NDJcdTA0MzhcdTA0MzlcIixcbiAgICAgICAgXCJcdTA0MTFcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MUFcdTA0MzJcdTA0NTZcdTA0NDJcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MjJcdTA0NDBcdTA0MzBcdTA0MzJcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MjdcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MUJcdTA0MzhcdTA0M0ZcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MjFcdTA0MzVcdTA0NDBcdTA0M0ZcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MTJcdTA0MzVcdTA0NDBcdTA0MzVcdTA0NDFcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MTZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICAgICAgXCJcdTA0MUJcdTA0MzhcdTA0NDFcdTA0NDJcdTA0M0VcdTA0M0ZcdTA0MzBcdTA0MzRcIixcbiAgICAgICAgXCJcdTA0MTNcdTA0NDBcdTA0NDNcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NENcIixcbiAgICBdO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXG4gICAgICAgIFwiXHUwNDFEXHUwNDM1XHUwNDM0XHUwNDU2XHUwNDNCXHUwNDRGXCIsXG4gICAgICAgIFwiXHUwNDFGXHUwNDNFXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDU2XHUwNDNCXHUwNDNFXHUwNDNBXCIsXG4gICAgICAgIFwiXHUwNDEyXHUwNDU2XHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNFXHUwNDNBXCIsXG4gICAgICAgIFwiXHUwNDIxXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0XHUwNDMwXCIsXG4gICAgICAgIFwiXHUwNDI3XHUwNDM1XHUwNDQyXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMzXCIsXG4gICAgICAgIFwiXHUwNDFGJ1x1MDQ0Rlx1MDQ0Mlx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQ0RlwiLFxuICAgICAgICBcIlx1MDQyMVx1MDQ0M1x1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMFwiXG4gICAgXTtcblxuICAgIGNvbnN0IHdlZWtkYXlzID0gW1xuICAgICAgICBcIlx1MDQxRlx1MDQzRFwiLFxuICAgICAgICBcIlx1MDQxMlx1MDQ0MlwiLFxuICAgICAgICBcIlx1MDQyMVx1MDQ0MFwiLFxuICAgICAgICBcIlx1MDQyN1x1MDQ0MlwiLFxuICAgICAgICBcIlx1MDQxRlx1MDQ0MlwiLFxuICAgICAgICBcIlx1MDQyMVx1MDQzMVwiLFxuICAgICAgICBcIlx1MDQxRFx1MDQzNFwiXG4gICAgXTtcblxuICAgIGxldCBkaXNwbGF5ZWRNb250aCA9IC0xO1xuICAgIGxldCBkaXNwbGF5ZWRZZWFyID0gLTE7XG5cbiAgICBjb25zdCB1cGRhdGVDYWxlbmRhciA9ICgpOiB2b2lkID0+IHtcblxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGNvbnN0IGRheSA9IFN0cmluZyhcbiAgICAgICAgICAgIG5vdy5nZXREYXRlKClcbiAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICAgICAgY29uc3QgbW9udGggPSBTdHJpbmcoXG4gICAgICAgICAgICBub3cuZ2V0TW9udGgoKSArIDFcbiAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICAgICAgY29uc3QgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzID0gU3RyaW5nKFxuICAgICAgICAgICAgbm93LmdldEhvdXJzKClcbiAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICAgICAgY29uc3QgbWludXRlcyA9IFN0cmluZyhcbiAgICAgICAgICAgIG5vdy5nZXRNaW51dGVzKClcbiAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IFN0cmluZyhcbiAgICAgICAgICAgIG5vdy5nZXRTZWNvbmRzKClcbiAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICAgICAgY3VycmVudERhdGUudGV4dENvbnRlbnQgPSBcbiAgICAgICAgICAgIGAke2RheU5hbWVzW25vdy5nZXREYXkoKV19IGAgK1xuICAgICAgICAgICAgYCR7ZGF5fS8ke21vbnRofS8ke3llYXJ9IGAgK1xuICAgICAgICAgICAgYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gXHUwNDFFXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRGIFx1MDQ0Mlx1MDQzMFx1MDQzMVx1MDQzQlx1MDQzOFx1MDQ0Nlx1MDQ1NiBcdTA0NDJcdTA0NTZcdTA0M0JcdTA0NENcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzQ1x1MDQ1Nlx1MDQzRFx1MDQ1NiBcdTA0M0NcdTA0NTZcdTA0NDFcdTA0NEZcdTA0NDZcdTA0NEYuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGRpc3BsYXllZE1vbnRoID09PSBub3cuZ2V0TW9udGgoKSAmJlxuICAgICAgICAgICAgZGlzcGxheWVkWWVhciA9PT0gbm93LmdldEZ1bGxZZWFyKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwbGF5ZWRNb250aCA9IG5vdy5nZXRNb250aCgpO1xuICAgICAgICBkaXNwbGF5ZWRZZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgdGFibGUuZW1wdHkoKTtcblxuXG4gICAgICAgIC8vIFx1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMCBcdTA0M0NcdTA0NTZcdTA0NDFcdTA0NEZcdTA0NDZcdTA0NEYuXG4gICAgICAgIGNvbnN0IG1vbnRoUm93ID0gdGFibGUuY3JlYXRlRWwoXCJ0clwiLCB7Y2xzOiBcImNhbGVuZGFyLW1vbnRoLXJvd1wifSk7XG4gICAgICAgIGNvbnN0IG1vbnRoQ2VsbCA9IG1vbnRoUm93LmNyZWF0ZUVsKFwidGhcIiwge1xuICAgICAgICAgICAgdGV4dDogbW9udGhOYW1lc1tub3cuZ2V0TW9udGgoKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9udGhDZWxsLmNvbFNwYW4gPSA3O1xuXG4gICAgICAgIC8vIFx1MDQxN1x1MDQzMFx1MDQzM1x1MDQzRVx1MDQzQlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzQSBcdTA0MzRcdTA0M0RcdTA0NTZcdTA0MzIgXHUwNDQyXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDRGXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLmNyZWF0ZUVsKFwidHJcIik7XG5cbiAgICAgICAgZm9yIChsZXQgd2Vla2RheSA9IDA7IHdlZWtkYXkgPCB3ZWVrZGF5cy5sZW5ndGg7IHdlZWtkYXkrKykge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGVyUm93LmNyZWF0ZUVsKFwidGhcIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IHdlZWtkYXlzW3dlZWtkYXldXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHdlZWtkYXkgPT09IDUgfHwgd2Vla2RheSA9PT0gNikge1xuICAgICAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcyhcIndlZWtlbmRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIFx1MDQxRlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzOFx1MDQzOSBcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NEMgXHUwNDNDXHUwNDU2XHUwNDQxXHUwNDRGXHUwNDQ2XHUwNDRGLlxuICAgICAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgbm93LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBub3cuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcblxuXG4gICAgICAgIC8vIEpTOiBcdTA0MURcdTA0MzQgPSAwIC4uLiBcdTA0MjFcdTA0MzEgPSA2XG4gICAgICAgIC8vIERhc2hib2FyZDogXHUwNDFGXHUwNDNEID0gMCAuLi4gXHUwNDFEXHUwNDM0ID0gNlxuICAgICAgICBjb25zdCBmaXJzdFdlZWtkYXkgPSBcbiAgICAgICAgICAgIChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcblxuXG4gICAgICAgIC8vIFx1MDQxQS1cdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDM0XHUwNDNEXHUwNDU2XHUwNDMyIFx1MDQ0MyBcdTA0M0NcdTA0NTZcdTA0NDFcdTA0NEZcdTA0NDZcdTA0NTYuXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoXG4gICAgICAgICAgICBub3cuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIG5vdy5nZXRNb250aCgpICsgMSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgKS5nZXREYXRlKCk7XG5cblxuICAgICAgICBsZXQgZGF5TnVtYmVyID0gMTtcblxuICAgICAgICBmb3IgKGxldCB3ZWVrID0gMDsgd2VlayA8IDY7IHdlZWsrKykge1xuXG4gICAgICAgICAgICBjb25zdCByb3cgPSB0YWJsZS5jcmVhdGVFbChcInRyXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB3ZWVrZGF5ID0gMDsgd2Vla2RheSA8IDc7IHdlZWtkYXkrKykge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB3ZWVrICogNyArIHdlZWtkYXk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG5cbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPj0gZmlyc3RXZWVrZGF5ICYmXG4gICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA8PSBkYXlzSW5Nb250aFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2Vla2RheSA9PT0gNSB8fCB3ZWVrZGF5ID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzKFwid2Vla2VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheUVsZW1lbnQgPSBjZWxsLmNyZWF0ZUVsKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBTdHJpbmcoZGF5TnVtYmVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogXCJjYWxlbmRhci1kYXlcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5TnVtYmVyID09PSBub3cuZ2V0RGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlFbGVtZW50LmFkZENsYXNzKFwiY2FsZW5kYXItdG9kYXlcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdXBkYXRlQ2FsZW5kYXIoKTtcblxuICAgIC8vIFx1MDQxRVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0RiBcdTA0MzNcdTA0M0VcdTA0MzRcdTA0MzhcdTA0M0RcdTA0M0RcdTA0MzhcdTA0M0FcdTA0MzAgXHUwNDQ5XHUwNDNFXHUwNDQxXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDNEXHUwNDM0XHUwNDM4LlxuICAgIHdpbmRvdy5zZXRJbnRlcnZhbCh1cGRhdGVDYWxlbmRhciwgMTAwMCk7XG59IiwgImltcG9ydCB7IEFwcCwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IF9fYXdhaXQgfSBmcm9tIFwidHNsaWJcIjtcblxuaW50ZXJmYWNlIFJlY2VudEZpbGVFbnRyeSB7XG4gICAgcGF0aDpzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZW50RmlsZUl0ZW0ge1xuICAgIGZpbGU6IFRGaWxlO1xufVxuXG5jb25zdCBEQVRBX0ZPTERFUiA9IFwiU3lzdGVtL0RhdGFcIjtcbmNvbnN0IERBVEFfRklMRSA9IGAke0RBVEFfRk9MREVSfS9yZWNlbnQtZmlsZXMuanNvbmA7XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVJlY2VudEZpbGVzRGF0YShhcHA6IEFwcCk6IFByb21pc2U8VEZpbGU+IHtcbiAgICBcbiAgICBjb25zdCBleGlzdGluZ0ZpbGUgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKERBVEFfRklMRSk7XG5cbiAgICBpZiAoZXhpc3RpbmdGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nRmlsZTtcbiAgICB9XG5cbiAgICBjb25zdCBzeXN0ZW1Gb2xkZXIgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKFwiU3lzdGVtXCIpO1xuXG4gICAgaWYgKCFzeXN0ZW1Gb2xkZXIpIHtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihcIlN5c3RlbVwiKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZGF0YUZvbGRlciA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoREFUQV9GT0xERVIpO1xuICAgIFxuICAgIGlmICghZGF0YUZvbGRlcikge1xuICAgICAgICBhd2FpdCBhcHAudmF1bHQuY3JlYXRlRm9sZGVyKERBVEFfRk9MREVSKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlID0gYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZShEQVRBX0ZJTEUsIFwiW11cIik7XG5cbiAgICByZXR1cm4gZmlsZTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiByZWFkUmVjZW50RW50cmllcyhhcHA6IEFwcCk6IFByb21pc2U8UmVjZW50RmlsZUVudHJ5W10+IHtcbiAgICBjb25zdCBkYXRhRmlsZSA9IGF3YWl0IGVuc3VyZVJlY2VudEZpbGVzRGF0YShhcHApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQuY2FjaGVkUmVhZChkYXRhRmlsZSk7XG5cbiAgICAgICAgaWYgKCFjb250ZW50LnRyaW0oKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KSBhcyB1bmtub3duO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRyeSk6IGVudHJ5IGlzIFJlY2VudEZpbGVFbnRyeSA9PlxuICAgICAgICAgICAgICAgIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgZW50cnkgIT09IG51bGwgJiZcbiAgICAgICAgICAgIFwicGF0aFwiIGluIGVudHJ5ICYmXG4gICAgICAgICAgICB0eXBlb2YgZW50cnkucGF0aCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICApO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBcIkRhc2hib2FyZDogXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDM4XHUwNDNCXHUwNDNBXHUwNDMwIFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RiByZWNlbnQtZmlsZXMuanNvblwiLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm5bXTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyUmVjZW50RmlsZShhcHA6IEFwcCwgZmlsZTogVEZpbGUsIGxpbWl0ID0gMTApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBcdTA0MURcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDU0XHUwNDNDXHUwNDNFIFx1MDQ0MVx1MDQzQlx1MDQ0M1x1MDQzNlx1MDQzMVx1MDQzRVx1MDQzMlx1MDQzOFx1MDQzOSBKU09OIFx1MDQ0MyBcdTA0NDFcdTA0M0ZcdTA0MzhcdTA0NDFcdTA0M0VcdTA0M0EuXG4gICAgaWYgKGZpbGUucGF0aCA9PT0gREFUQV9GSUxFKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgcmVhZFJlY2VudEVudHJpZXMoYXBwKTtcblxuICAgIC8vIFx1MDQxMlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0RcdTA0NENcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDM4XHUwNDQxXHUwNDQzIFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQ0My5cbiAgICBjb25zdCBmaWx0ZXJlZCA9IGVudHJpZXMuZmlsdGVyKGVudHJ5ID0+IGVudHJ5LnBhdGggIT09IGZpbGUucGF0aCk7XG5cbiAgICAvLyBcdTA0MURcdTA0M0VcdTA0MzJcdTA0MzhcdTA0MzkgXHUwNDQ0XHUwNDMwXHUwNDM5XHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQ1NFx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0M0RcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDNFXHUwNDNBLlxuICAgIGZpbHRlcmVkLnVuc2hpZnQoe3BhdGg6IGZpbGUucGF0aH0pO1xuXG4gICAgLy8gXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDM4XHUwNDQxIFx1MDQzNFx1MDQzRSBcdTA0M0NcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgbGltaXQgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDM4XHUwNDQxXHUwNDU2XHUwNDMyLlxuICAgIGNvbnN0IHVwZGF0ZWQgPSBmaWx0ZXJlZC5zbGljZSgwLCBsaW1pdCk7XG5cbiAgICBjb25zdCBkYXRhRmlsZSA9IGF3YWl0IGVuc3VyZVJlY2VudEZpbGVzRGF0YShhcHApO1xuXG4gICAgYXdhaXQgYXBwLnZhdWx0Lm1vZGlmeShkYXRhRmlsZSwgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCwgbnVsbCwgMikpO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRGaWxlcyhhcHA6QXBwLCBsaW1pdCA9IDEwKTogUHJvbWlzZTxSZWNlbnRGaWxlSXRlbVtdPiB7XG4gICAgXG4gICAgY29uc3QgZW50cmllcyA9IGF3YWl0IHJlYWRSZWNlbnRFbnRyaWVzKGFwcCk7XG5cbiAgICBjb25zdCByZXN1bHQ6IFJlY2VudEZpbGVJdGVtW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZSA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZW50cnkucGF0aCk7XG5cbiAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7ZmlsZX0pO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCAiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBnZXRSZWNlbnRGaWxlcyB9IGZyb20gXCIuLi9kYXRhL1JlY2VudEZpbGVzRGF0YVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVyUmVjZW50RmlsZXMoY29udGFpbmVyOkhUTUxFbGVtZW50LCBhcHA6IEFwcCk6IFByb21pc2U8dm9pZD4ge1xuICAgIFxuICAgIGNvbnN0IGJsb2NrID0gY29udGFpbmVyLmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJkYXNoYm9hcmQtYmxvY2sgcmVjZW50LWZpbGVzXCJcbiAgICB9KTtcblxuICAgIGJsb2NrLmNyZWF0ZUVsKFwiaDJcIiwge1xuICAgICAgICB0ZXh0OiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ1NiBcdTA0NDRcdTA0MzBcdTA0MzlcdTA0M0JcdTA0MzhcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBnZXRSZWNlbnRGaWxlcyhhcHAsIDEwKTtcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYmxvY2suY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDFEXHUwNDM1XHUwNDQ5XHUwNDNFXHUwNDM0XHUwNDMwXHUwNDMyXHUwNDNEXHUwNDU2IFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQzOCBcdTA0MzJcdTA0NTZcdTA0MzRcdTA0NDFcdTA0NDNcdTA0NDJcdTA0M0RcdTA0NTYuXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZmlsZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBibG9jay5jcmVhdGVEaXYoe2NsczogXCJyZWNlbnQtZmlsZS1pdGVtXCJ9KTtcblxuICAgICAgICBjb25zdCBsaW5rID0gaXRlbS5jcmVhdGVFbChcImFcIiwge1xuICAgICAgICAgICAgdGV4dDogZW50cnkuZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgIGNsczogXCJpbnRlcm5hbC1saW5rXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGluay5kYXRhc2V0LmhyZWYgPSBlbnRyeS5maWxlLnBhdGg7XG5cbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZvaWQgYXBwLndvcmtzcGFjZVxuICAgICAgICAgICAgICAgIC5nZXRMZWFmKGZhbHNlKVxuICAgICAgICAgICAgICAgIC5vcGVuRmlsZShlbnRyeS5maWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsICJpbXBvcnQgeyBBcHAsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnRJdGVtIHtcbiAgICBmaWxlOiBURmlsZTtcbiAgICBkYXRlOiBEYXRlO1xufVxuZXhwb3J0IGludGVyZmFjZSBEZWFkbGluZUl0ZW0ge1xuICAgIGZpbGU6IFRGaWxlO1xuICAgIGRhdGU6IERhdGU7XG59XG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYWxTdGF0aXN0aWNzIHtcbiAgICB0YXNrczogbnVtYmVyO1xuICAgIG5vdGVzOiBudW1iZXI7XG4gICAgdGFnczogbnVtYmVyO1xuICAgIHByb2plY3RzOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIExpYnJhcnlTdGF0aXN0aWNzIHtcbiAgICBib29rczogbnVtYmVyO1xuICAgIHJlYWRCb29rczogbnVtYmVyO1xuICAgIGNhdGVnb3JpemVkQm9va3M6IG51bWJlcjtcbiAgICB1bmNhdGVnb3JpemVkQm9va3M6IG51bWJlcjtcbiAgICBjYXRlZ29yaWVzOiBudW1iZXI7XG4gICAgZm9ybWF0czogbnVtYmVyO1xufVxuXG5cbmZ1bmN0aW9uIHRvRGF0ZSh2YWx1ZTogdW5rbm93bik6IERhdGUgfCBudWxsIHtcbiAgICBcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZS5nZXRUaW1lKCkpID8gbnVsbCA6IHZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICByZXR1cm4gaXNOYU4oZGF0ZS5nZXRUaW1lKCkpID8gbnVsbCA6IGRhdGU7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5RXZlbnRzKGFwcDogQXBwLCBsaW1pdCA9IDYpOiBFdmVudEl0ZW1bXSB7XG4gICAgXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShcbiAgICAgICAgbm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpLCBub3cuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgICBcbiAgICBjb25zdCBlbmRPZkRheSA9IG5ldyBEYXRlKFxuICAgICAgICBub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIG5vdy5nZXREYXRlKCkgKyAxXG4gICAgKTtcblxuICAgIGNvbnN0IGV2ZW50czogRXZlbnRJdGVtW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBjYWNoZT8uZnJvbnRtYXR0ZXI7XG5cbiAgICAgICAgaWYgKCFmcm9udG1hdHRlcikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbnRtYXR0ZXIudHlwZSAhPT0gXCJldmVudFwiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV2ZW50RGF0ZSA9IHRvRGF0ZShmcm9udG1hdHRlcltcImR0LWV2ZW50XCJdKTtcblxuICAgICAgICBpZiAoIWV2ZW50RGF0ZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnREYXRlID49IHN0YXJ0T2ZEYXkgJiYgZXZlbnREYXRlIDwgZW5kT2ZEYXkpIHtcbiAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtmaWxlLCBkYXRlOiBldmVudERhdGV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBldmVudHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuZGF0ZS5nZXRUaW1lKCkgLSBiLmRhdGUuZ2V0VGltZSgpKVxuICAgICAgICAuc2xpY2UoMCwgbGltaXQpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVEZWFkbGluZXMoYXBwOiBBcHAsIGxpbWl0ID0gNik6IERlYWRsaW5lSXRlbVtdIHtcbiAgICBcbiAgICBjb25zdCBkZWFkbGluZXM6IERlYWRsaW5lSXRlbVtdID0gW107XG5cbiAgICBmb3IoY29uc3QgZmlsZSBvZiBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG5cbiAgICAgICAgY29uc3QgY2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk7XG5cbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBjYWNoZT8uZnJvbnRtYXR0ZXI7XG5cbiAgICAgICAgaWYgKCFmcm9udG1hdHRlcikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbnRtYXR0ZXIudHlwZSAhPT0gXCJkZWFkbGluZVwiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9udG1hdHRlcltcImRlYWRsaW5lLXN0YXR1c1wiXSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWFkbGluZURhdGUgPSB0b0RhdGUoZnJvbnRtYXR0ZXJbXCJkdC1vdmVyLWRlYWRsaW5lXCJdKTtcblxuICAgICAgICBpZiAoIWRlYWRsaW5lRGF0ZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBkZWFkbGluZXMucHVzaCh7ZmlsZSwgZGF0ZTogZGVhZGxpbmVEYXRlfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlYWRsaW5lc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5kYXRlLmdldFRpbWUoKSAtIGIuZGF0ZS5nZXRUaW1lKCkpXG4gICAgICAgIC5zbGljZSgwLCBsaW1pdCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdlbmVyYWxTdGF0aXN0aWNzKGFwcDogQXBwKTogR2VuZXJhbFN0YXRpc3RpY3Mge1xuXG4gICAgY29uc3QgbWFya2Rvd25GaWxlcyA9IGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG5cbiAgICBsZXQgcHJvamVjdHMgPSAwO1xuICAgIGxldCB0YXNrcyA9IDA7XG5cbiAgICBjb25zdCB0YWdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgbWFya2Rvd25GaWxlcykge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmcm9udG1hdHRlciA9IGNhY2hlPy5mcm9udG1hdHRlcjtcblxuICAgICAgICBpZiAoZnJvbnRtYXR0ZXI/LnR5cGUgPT09IFwicHJvamVjdFwiKSB7XG4gICAgICAgICAgICBwcm9qZWN0cysrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb250bWF0dGVyPy50eXBlID09PSBcInRhc2tcIikge1xuICAgICAgICAgICAgdGFza3MrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2FjaGU/LnRhZ3MpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCB0YWdFbnRyeSBvZiBjYWNoZS50YWdzKSB7XG4gICAgICAgICAgICB0YWdzLmFkZCh0YWdFbnRyeS50YWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGFza3MsXG4gICAgICAgIG5vdGVzOiBtYXJrZG93bkZpbGVzLmxlbmd0aCxcbiAgICAgICAgdGFnczogdGFncy5zaXplLFxuICAgICAgICBwcm9qZWN0c1xuICAgIH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpYnJhcnlTdGF0aXN0aWNzKGFwcDogQXBwKTogTGlicmFyeVN0YXRpc3RpY3Mge1xuICAgIGxldCBib29rcyA9IDA7XG4gICAgbGV0IHJlYWRCb29rcyA9IDA7XG4gICAgbGV0IGNhdGVnb3JpemVkQm9va3MgPSAwO1xuICAgIGxldCB1bmNhdGVnb3JpemVkQm9va3MgPSAwO1xuXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGNvbnN0IGZvcm1hdHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIGZvcihjb25zdCBmaWxlIG9mIGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCkpIHtcblxuICAgICAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBjYWNoZT8uZnJvbnRtYXR0ZXI7XG5cbiAgICAgICAgaWYgKGZyb250bWF0dGVyPy50eXBlICE9PSBcImJvb2tcIikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBib29rcysrO1xuXG4gICAgICAgIC8vIFx1MDQyMVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQ0M1x1MDQ0MSBcdTA0M0FcdTA0M0RcdTA0MzhcdTA0MzNcdTA0MzhcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gZnJvbnRtYXR0ZXJbXCJib29rLXN0YXR1c1wiXTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBcIkNvbXBsZXRlZFwiKSB7XG4gICAgICAgICAgICByZWFkQm9va3MrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1MDQxQVx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzM1x1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQ1N1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGZyb250bWF0dGVyW1wiYm9vay1jYXRlZ29yeVwiXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYXRlZ29yeSkpIHtcblxuICAgICAgICAgICAgaWYgKGNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yaXplZEJvb2tzKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVuY2F0ZWdvcml6ZWRCb29rcysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgJiYgaXRlbS50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllcy5hZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhdGVnb3J5ID09PSBcInN0cmluZ1wiICYmIGNhdGVnb3J5LnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRlZ29yaXplZEJvb2tzKys7XG4gICAgICAgICAgICBjYXRlZ29yaWVzLmFkZChjYXRlZ29yeSk7XG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB1bmNhdGVnb3JpemVkQm9va3MrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1MDQyNFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0MiBcdTA0M0FcdTA0M0RcdTA0MzhcdTA0MzNcdTA0MzhcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gZnJvbnRtYXR0ZXJbXCJmb3JtYXRcIl07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwic3RyaW5nXCIgJiYgZm9ybWF0LnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgZm9ybWF0cy5hZGQoZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGJvb2tzLFxuICAgICAgICByZWFkQm9va3MsXG4gICAgICAgIGNhdGVnb3JpemVkQm9va3MsXG4gICAgICAgIHVuY2F0ZWdvcml6ZWRCb29rcyxcbiAgICAgICAgY2F0ZWdvcmllczogY2F0ZWdvcmllcy5zaXplLFxuICAgICAgICBmb3JtYXRzOiBmb3JtYXRzLnNpemVcbiAgICB9O1xufSIsICIgaW1wb3J0IHsgXG4gICAgZ2V0QWN0aXZlRGVhZGxpbmVzLFxuICAgIGdldEdlbmVyYWxTdGF0aXN0aWNzLFxuICAgIGdldExpYnJhcnlTdGF0aXN0aWNzLFxuICAgIGdldFRvZGF5RXZlbnRzXG4gIH0gZnJvbSBcIi4uL2RhdGEvUGxhbm5pbmdEYXRhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQbGFubmluZ1N0YXRpc3RpY3MoXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBhcHA6IGltcG9ydChcIm9ic2lkaWFuXCIpLkFwcFxuKTogdm9pZCB7XG5cbiAgICBjb25zdCBibG9jayA9IGNvbnRhaW5lci5jcmVhdGVEaXYoe2NsczogXCJkYXNoYm9hcmQtYmxvY2sgcGxhbm5pbmctc3RhdGlzdGljc1wifSk7XG5cbiAgICBjb25zdCBncmlkID0gYmxvY2suY3JlYXRlRGl2KHtjbHM6IFwicGxhbm5pbmctZ3JpZFwifSk7XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gXHUwNDFGXHUwNDFFXHUwNDE0XHUwNDA2XHUwNDA3IFx1MDQyMVx1MDQyQ1x1MDQxRVx1MDQxM1x1MDQxRVx1MDQxNFx1MDQxRFx1MDQwNlxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBldmVudHNCbG9jayA9IGdyaWQuY3JlYXRlRGl2KHtjbHM6IFwicGxhbm5pbmctc3ViYmxvY2sgcGxhbm5pbmctZXZlbnRzXCJ9KTtcbiAgICBcbiAgICBldmVudHNCbG9jay5jcmVhdGVFbChcImgzXCIsIHt0ZXh0OiBcIlx1MDQxRlx1MDQzRVx1MDQzNFx1MDQ1Nlx1MDQ1NyBcdTA0NDFcdTA0NENcdTA0M0VcdTA0MzNcdTA0M0VcdTA0MzRcdTA0M0RcdTA0NTZcIn0pO1xuXG4gICAgY29uc3QgZXZlbnRzID0gZ2V0VG9kYXlFdmVudHMoYXBwKTtcblxuICAgIGlmIChldmVudHMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgZXZlbnRzQmxvY2suY3JlYXRlRWwoXCJwXCIsIHt0ZXh0OiBcIlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQ1NiBcdTA0M0ZcdTA0M0VcdTA0MzRcdTA0NTZcdTA0NTcgXHUwNDMyXHUwNDU2XHUwNDM0XHUwNDQxXHUwNDQzXHUwNDQyXHUwNDNEXHUwNDU2LlwifSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGlzdCA9IGV2ZW50c0Jsb2NrLmNyZWF0ZURpdih7Y2xzOiBcImV2ZW50cy1saXN0XCJ9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdC5jcmVhdGVEaXYoe2NsczogXCJldmVudC1pdGVtXCJ9KTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBpdGVtLmNyZWF0ZUVsKFwiYVwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZXZlbnQuZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICBjbHM6IFwiaW50ZXJuYWwtbGlua1wiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrRXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZvaWQgYXBwLndvcmtzcGFjZS5nZXRMZWFmKGZhbHNlKS5vcGVuRmlsZShldmVudC5maWxlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdGVtLmNyZWF0ZUVsKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZm9ybWF0VGltZShldmVudC5kYXRlKSxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZXZlbnQtdGltZVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBcdTA0MTRcdTA0MTVcdTA0MTRcdTA0MUJcdTA0MTBcdTA0MTlcdTA0MURcdTA0MThcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgZGVhZGxpbmVzQmxvY2sgPSBncmlkLmNyZWF0ZURpdih7Y2xzOiBcInBsYW5uaW5nLXN1YmJsb2NrIHBsYW5uaW5nLWRlYWRsaW5lc1wifSk7XG5cbiAgICBkZWFkbGluZXNCbG9jay5jcmVhdGVFbChcImgzXCIsIHtcbiAgICAgICAgdGV4dDogXCJcdTA0MTRcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcdTA0MzhcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgZGVhZGxpbmVzID0gZ2V0QWN0aXZlRGVhZGxpbmVzKGFwcCk7XG5cbiAgICBpZiAoZGVhZGxpbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWFkbGluZXNCbG9jay5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTA0MTBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0M0RcdTA0NTYgXHUwNDM0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXHUwNDM4IFx1MDQzMlx1MDQ1Nlx1MDQzNFx1MDQ0MVx1MDQ0M1x1MDQ0Mlx1MDQzRFx1MDQ1Ni5cIlxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsaXN0ID0gZGVhZGxpbmVzQmxvY2suY3JlYXRlRGl2KHtjbHM6IFwiZGVhZGxpbmUtbGlzdFwifSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBkZWFkbGluZSBvZiBkZWFkbGluZXMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY3JlYXRlRGl2KHtjbHM6IFwiZGVhZGxpbmUtaXRlbVwifSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBpdGVtLmNyZWF0ZUVsKFwiYVwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZGVhZGxpbmUuZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICBjbHM6IFwiaW50ZXJuYWwtbGlua1wiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZvaWQgYXBwLndvcmtzcGFjZVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TGVhZihmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgLm9wZW5GaWxlKGRlYWRsaW5lLmZpbGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0ZW0uY3JlYXRlRWwoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmb3JtYXREYXRlVGltZShkZWFkbGluZS5kYXRlKSxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZGVhZGxpbmUtZGF0ZVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBcdTA0MTdcdTA0MTBcdTA0MTNcdTA0MTBcdTA0MUJcdTA0MkNcdTA0MURcdTA0MTAgXHUwNDIxXHUwNDIyXHUwNDEwXHUwNDIyXHUwNDE4XHUwNDIxXHUwNDIyXHUwNDE4XHUwNDFBXHUwNDEwXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGNvbnN0IGdlbmVyYWxCbG9jayA9IGdyaWQuY3JlYXRlRGl2KHtjbHM6IFwicGxhbm5pbmctc3ViYmxvY2sgZ2VuZXJhbC1zdGF0aXN0aWNzXCJ9KTtcblxuICAgIGdlbmVyYWxCbG9jay5jcmVhdGVFbChcImgzXCIsIHt0ZXh0OiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzMCBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0FcdTA0MzBcIn0pO1xuXG4gICAgY29uc3Qgc3RhdGlzdGljcyA9IGdldEdlbmVyYWxTdGF0aXN0aWNzKGFwcCk7XG4gICAgY29uc3Qgc3RhdGlzdGljc0xpc3QgPSBnZW5lcmFsQmxvY2suY3JlYXRlRGl2KHtjbHM6IFwic3RhdGlzdGljcy1saXN0XCJ9KTtcblxuICAgIHN0YXRpc3RpY3NMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQxN1x1MDQzMFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzRFx1MDQ0QzogJHtzdGF0aXN0aWNzLnRhc2tzfWBcbiAgICB9KTtcblxuICAgIHN0YXRpc3RpY3NMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQ1Nlx1MDQzMjogJHtzdGF0aXN0aWNzLnByb2plY3RzfWBcbiAgICB9KTtcblxuICAgIHN0YXRpc3RpY3NMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQxRFx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzRVx1MDQzQTogJHtzdGF0aXN0aWNzLm5vdGVzfWBcbiAgICB9KTtcblxuICAgIHN0YXRpc3RpY3NMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQyMlx1MDQzNVx1MDQzM1x1MDQ1Nlx1MDQzMjogJHtzdGF0aXN0aWNzLnRhZ3N9YFxuICAgIH0pO1xuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFx1MDQyMVx1MDQyMlx1MDQxMFx1MDQyMlx1MDQxOFx1MDQyMVx1MDQyMlx1MDQxOFx1MDQxQVx1MDQxMCBcdTA0MTFcdTA0MDZcdTA0MTFcdTA0MUJcdTA0MDZcdTA0MUVcdTA0MjJcdTA0MTVcdTA0MUFcdTA0MThcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgbGlicmFyeUJsb2NrID0gZ3JpZC5jcmVhdGVEaXYoe2NsczogXCJwbGFubmluZy1zdWJibG9jayBsaWJyYXJ5LXN0YXRpc3RpY3NcIn0pO1xuXG4gICAgbGlicmFyeUJsb2NrLmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IFwiXHUwNDIxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNBXHUwNDMwIFx1MDQzMVx1MDQ1Nlx1MDQzMVx1MDQzQlx1MDQ1Nlx1MDQzRVx1MDQ0Mlx1MDQzNVx1MDQzQVx1MDQzOFwifSk7XG5cbiAgICBjb25zdCBsaWJyYXJ5ID0gZ2V0TGlicmFyeVN0YXRpc3RpY3MoYXBwKTtcbiAgICBjb25zdCBsaWJyYXJ5TGlzdCA9IGxpYnJhcnlCbG9jay5jcmVhdGVEaXYoe2NsczogXCJzdGF0aXN0aWNzLWxpc3RcIn0pO1xuXG4gICAgbGlicmFyeUxpc3QuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInN0YXRpc3RpY3MtaXRlbVwiLFxuICAgICAgICB0ZXh0OiBgXHUwNDEyXHUwNDQxXHUwNDRDXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzQVx1MDQzRFx1MDQzOFx1MDQzMzogJHtsaWJyYXJ5LmJvb2tzfWBcbiAgICB9KTtcblxuICAgIGxpYnJhcnlMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRSBcdTA0M0FcdTA0M0RcdTA0MzhcdTA0MzM6ICR7bGlicmFyeS5yZWFkQm9va3N9YFxuICAgIH0pO1xuXG4gICAgbGlicmFyeUxpc3QuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInN0YXRpc3RpY3MtaXRlbVwiLFxuICAgICAgICB0ZXh0OiBgXHUwNDFBXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDMzXHUwNDNFXHUwNDQwXHUwNDU2XHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFIFx1MDQzQVx1MDQzRFx1MDQzOFx1MDQzMzogJHtsaWJyYXJ5LmNhdGVnb3JpemVkQm9va3N9YFxuICAgIH0pO1xuXG4gICAgbGlicmFyeUxpc3QuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInN0YXRpc3RpY3MtaXRlbVwiLFxuICAgICAgICB0ZXh0OiBgXHUwNDFBXHUwNDNEXHUwNDM4XHUwNDMzIFx1MDQzMVx1MDQzNVx1MDQzNyBcdTA0M0FcdTA0MzBcdTA0NDJcdTA0MzVcdTA0MzNcdTA0M0VcdTA0NDBcdTA0NTZcdTA0Mzk6ICR7bGlicmFyeS51bmNhdGVnb3JpemVkQm9va3N9YFxuICAgIH0pO1xuXG4gICAgbGlicmFyeUxpc3QuY3JlYXRlRGl2KHtcbiAgICAgICAgY2xzOiBcInN0YXRpc3RpY3MtaXRlbVwiLFxuICAgICAgICB0ZXh0OiBgXHUwNDFBXHUwNDU2XHUwNDNCXHUwNDRDXHUwNDNBXHUwNDU2XHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzQVx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzM1x1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQzOSBcdTA0M0FcdTA0M0RcdTA0MzhcdTA0MzM6ICR7bGlicmFyeS5jYXRlZ29yaWVzfWBcbiAgICB9KTtcblxuICAgIGxpYnJhcnlMaXN0LmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJzdGF0aXN0aWNzLWl0ZW1cIixcbiAgICAgICAgdGV4dDogYFx1MDQxQVx1MDQ1Nlx1MDQzQlx1MDQ0Q1x1MDQzQVx1MDQ1Nlx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDJcdTA0NTZcdTA0MzIgXHUwNDNBXHUwNDNEXHUwNDM4XHUwNDMzOiAke2xpYnJhcnkuZm9ybWF0c31gXG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VGltZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBgJHtTdHJpbmcoZGF0ZS5nZXRIb3VycygpKS5wYWRTdGFydCgyLCBcIjBcIil9OmAgK1xuICAgICAgICBgJHtTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gXG4gICAgKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXREYXRlVGltZShkYXRlOkRhdGUpOiBzdHJpbmcge1xuICAgIFxuICAgIHJldHVybihcbiAgICAgICAgYCR7U3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIil9L2AgK1xuICAgICAgICBgJHtTdHJpbmcoZGF0ZS5nZXRNb250aCgpKS5wYWRTdGFydCgyLCBcIjBcIil9L2AgK1xuICAgICAgICBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9IGAgK1xuICAgICAgICBgJHtTdHJpbmcoZGF0ZS5nZXRIb3VycygpKS5wYWRTdGFydCgyLCBcIjBcIil9OmAgK1xuICAgICAgICBgJHtTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gXG4gICAgKTtcbn0iLCAiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhc2tJdGVtIHtmaWxlOiBURmlsZX1cbmV4cG9ydCBpbnRlcmZhY2UgVGFza3NEYXRhIHtcbiAgICBoaWdoOiBUYXNrSXRlbVtdO1xuICAgIG5vcm1hbDogVGFza0l0ZW1bXTtcbiAgICBub25lOiBUYXNrSXRlbVtdO1xuICAgIHBvc3Rwb25lZDogVGFza0l0ZW1bXTtcbiAgICB3YWl0aW5nOiBUYXNrSXRlbVtdO1xufVxuXG5cbmZ1bmN0aW9uIGdldFRhc2tzQnlQcmlvcml0eShhcHA6IEFwcCwgcHJpb3JpdHk6IHN0cmluZywgbGltaXQgPSA2KTogVGFza0l0ZW1bXSB7XG4gICAgXG4gICAgY29uc3QgcmVzdWx0OiBUYXNrSXRlbVtdID0gW107XG5cbiAgICBmb3IoY29uc3QgZmlsZSBvZiBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG5cbiAgICAgICAgY29uc3QgY2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk7XG4gICAgICAgIGNvbnN0IGZyb250bWF0dGVyID0gY2FjaGU/LmZyb250bWF0dGVyO1xuXG4gICAgICAgIGlmICghZnJvbnRtYXR0ZXIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb250bWF0dGVyLnR5cGUgIT09IFwidGFza1wiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9udG1hdHRlcltcInRhc2stcHJpb3JpdHlcIl0gIT09IHByaW9yaXR5KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5wdXNoKHtmaWxlfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBnZXRUYXNrc0J5U3RhdHVzKGFwcDpBcHAsIHN0YXR1czogc3RyaW5nLCBsaW1pdCA9IDUpOiBUYXNrSXRlbVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IFRhc2tJdGVtW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBjYWNoZT8uZnJvbnRtYXR0ZXI7XG5cbiAgICAgICAgaWYgKCFmcm9udG1hdHRlcikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbnRtYXR0ZXIudHlwZSAhPT0gXCJ0YXNrXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb250bWF0dGVyW1widGFzay1zdGF0dXNcIl0gIT09IHN0YXR1cykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQucHVzaCh7ZmlsZX0pO1xuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRhc2soXG4gICAgYXBwOiBBcHAsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHByaW9yaXR5OiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHBhZCA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9XG4gICAgICAgIGAke25vdy5nZXRGdWxsWWVhcigpfS1gICtcbiAgICAgICAgYCR7cGFkKG5vdy5nZXRNb250aCgpICsgMSl9LWAgK1xuICAgICAgICBgJHtwYWQobm93LmdldERhdGUoKSl9LWAgK1xuICAgICAgICBgJHtwYWQobm93LmdldEhvdXJzKCkpfS1gICtcbiAgICAgICAgYCR7cGFkKG5vdy5nZXRNaW51dGVzKCkpfS1gO1xuXG4gICAgY29uc3QgY29udGVudCA9XG4gICAgYC0tLVxuICAgIHR5cGU6IHRhc2tcbiAgICB0YXNrLXByaW9yaXR5OiAke3ByaW9yaXR5fVxuICAgIHRhc2stc3RhdHVzOiBhY3RpdmVcbiAgICBkdC1jcmVhdGVkOiAke2NyZWF0ZWREYXRlfVxuLS0tXG4jIyBcdTA0MUVcdTA0M0ZcdTA0MzhcdTA0NDFcblx1MDQxQVx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0M0VcdTA0M0ZcdTA0MzhcdTA0NDEgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGLlxuXG4jIyBcdTA0MUNcdTA0MzVcdTA0NDJcdTA0MzBcblx1MDQxRVx1MDQzRlx1MDQzOFx1MDQ0MSBcdTA0NDBcdTA0MzVcdTA0MzdcdTA0NDNcdTA0M0JcdTA0NENcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDMsIFx1MDQ0Rlx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0MzFcdTA0NDNcdTA0MzRcdTA0MzUgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDRGXHUwNDMzXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDM4XHUwNDM5LlxuXG4jIyBcdTA0MUZcdTA0M0VcdTA0MzInXHUwNDRGXHUwNDM3XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0MlxuXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyLCBcdTA0MzRcdTA0M0UgXHUwNDRGXHUwNDNBXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGLlxuXG4jIyBcdTA0MUZcdTA0M0VcdTA0MzInXHUwNDRGXHUwNDM3XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzNFx1MDQzNVx1MDQzNFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFxuXHUwNDE0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEIFx1MDQzNFx1MDQzRSBcdTA0NEZcdTA0M0FcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDNFXHUwNDQyXHUwNDQwXHUwNDU2XHUwNDMxXHUwNDNEXHUwNDNFIFx1MDQzMlx1MDQzOFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQzMFx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGLlxuXG4jIyBcdTA0MURcdTA0M0VcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0FcdTA0Mzhcblx1MDQxNFx1MDQzRVx1MDQzNFx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQzRVx1MDQzMlx1MDQzMCBcdTA0NTZcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0NTZcdTA0NEYgXHUwNDQ5XHUwNDNFXHUwNDM0XHUwNDNFIFx1MDQzMlx1MDQzOFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEYuXG5gO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IGFwcC52YXVsdC5jcmVhdGUoYCR7bmFtZX0ubWRgLCBjb250ZW50KTtcblxuICAgICAgICBhd2FpdCBhcHAud29ya3NwYWNlLmdldExlYWYoZmFsc2UpLm9wZW5GaWxlKGZpbGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIHRhc2s6XCIsIGVycm9yKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhc2tzKGFwcDogQXBwKTogVGFza3NEYXRhIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhpZ2g6IGdldFRhc2tzQnlQcmlvcml0eShhcHAsIFwiaGlnaFwiLCA2KSxcbiAgICAgICAgbm9ybWFsOiBnZXRUYXNrc0J5UHJpb3JpdHkoYXBwLCBcIm5vcm1hbFwiLCA2KSxcbiAgICAgICAgbm9uZTogZ2V0VGFza3NCeVByaW9yaXR5KGFwcCwgXCJub25lXCIsIDYpLFxuICAgICAgICBwb3N0cG9uZWQ6IGdldFRhc2tzQnlTdGF0dXMoYXBwLCBcInBvc3Rwb25lZFwiLCA1KSxcbiAgICAgICAgd2FpdGluZzogZ2V0VGFza3NCeVN0YXR1cyhhcHAsIFwid2FpdGluZ1wiLCA1KVxuICAgIH07XG59IiwgImltcG9ydCB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgZ2V0VGFza3MsIFRhc2tJdGVtIH0gZnJvbSBcIi4uL2RhdGEvVGFza3NEYXRhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUYXNrcyhjb250YWluZXI6IEhUTUxFbGVtZW50LCBhcHA6IEFwcCk6IHZvaWQge1xuXG4gICAgY29uc3QgYmxvY2sgPSBjb250YWluZXIuY3JlYXRlRGl2KHtjbHM6IFwiZGFzaGJvYXJkLWJsb2NrIHRhc2tzXCJ9KTtcbiAgICBjb25zdCBncmlkID0gYmxvY2suY3JlYXRlRGl2KHtjbHM6IFwidGFza3MtZ3JpZFwifSk7XG4gICAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhhcHApO1xuXG4gICAgcmVuZGVyUHJpb3JpdHlTZWN0aW9uKFxuICAgICAgICBncmlkLFxuICAgICAgICBhcHAsXG4gICAgICAgIFwiXHUwNDEyXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDNBXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQ1Nlx1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQ0Mlx1MDQzNVx1MDQ0MlwiLFxuICAgICAgICBcInRhc2staGlnaFwiLFxuICAgICAgICB0YXNrcy5oaWdoXG4gICAgKTtcblxuICAgIHJlbmRlclByaW9yaXR5U2VjdGlvbihcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgYXBwLFxuICAgICAgICBcIlx1MDQxN1x1MDQzMlx1MDQzOFx1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0NTZcdTA0M0VcdTA0NDBcdTA0NTZcdTA0NDJcdTA0MzVcdTA0NDJcIixcbiAgICAgICAgXCJ0YXNrLW5vcm1hbFwiLFxuICAgICAgICB0YXNrcy5ub3JtYWxcbiAgICApO1xuXG4gICAgcmVuZGVyUHJpb3JpdHlTZWN0aW9uKFxuICAgICAgICBncmlkLFxuICAgICAgICBhcHAsXG4gICAgICAgIFwiXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQ1Nlx1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQ0Mlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzQ1wiLFxuICAgICAgICBcInRhc2stbm9uZVwiLFxuICAgICAgICB0YXNrcy5ub25lXG4gICAgKTtcblxuICAgIHJlbmRlclN0YXR1c1NlY3Rpb24oXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGFwcCxcbiAgICAgICAgXCJcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzVcdTA0NDFcdTA0MzVcdTA0M0RcdTA0NTZcIixcbiAgICAgICAgXCJ0YXNrLXBvc3Rwb25lZFwiLFxuICAgICAgICB0YXNrcy5wb3N0cG9uZWQsXG4gICAgICAgIFwiXHUwNDFGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDQxXHUwNDM1XHUwNDNEXHUwNDU2IFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RiBcdTA0MzJcdTA0NTZcdTA0MzRcdTA0NDFcdTA0NDNcdTA0NDJcdTA0M0RcdTA0NTYuXCJcbiAgICApO1xuXG4gICAgcmVuZGVyU3RhdHVzU2VjdGlvbihcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgYXBwLFxuICAgICAgICBcIlx1MDQxMiBcdTA0M0VcdTA0NDdcdTA0NTZcdTA0M0FcdTA0NDNcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NTZcIixcbiAgICAgICAgXCJ0YXNrLXdhaXRpbmdcIixcbiAgICAgICAgdGFza3Mud2FpdGluZyxcbiAgICAgICAgXCJcdTA0MTdcdTA0MzBcdTA0MzJcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEYgXHUwNDMyIFx1MDQzRVx1MDQ0N1x1MDQ1Nlx1MDQzQVx1MDQ0M1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ1NiBcdTA0MzJcdTA0NTZcdTA0MzRcdTA0NDFcdTA0NDNcdTA0NDJcdTA0M0RcdTA0NTYuXCJcbiAgICApO1xufVxuXG5cbmZ1bmN0aW9uIHJlbmRlclByaW9yaXR5U2VjdGlvbihcbiAgICBncmlkOiBIVE1MRWxlbWVudCxcbiAgICBhcHA6IEFwcCxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgIHRhc2tzOiBUYXNrSXRlbVtdXG4pOiB2b2lkIHtcblxuICAgIGNvbnN0IHNlY3Rpb24gPSBncmlkLmNyZWF0ZURpdih7Y2xzOiBgdGFzay1zZWN0aW9uICR7Y2xhc3NOYW1lfWB9KTtcblxuICAgIHNlY3Rpb24uY3JlYXRlRWwoXCJoM1wiLCB7dGV4dDogdGl0bGV9KTtcblxuICAgIHJlbmRlclRhc2tMaXN0KHNlY3Rpb24sIGFwcCwgdGFza3MsIFwiXHUwNDE3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGIFx1MDQzMlx1MDQ1Nlx1MDQzNFx1MDQ0MVx1MDQ0M1x1MDQ0Mlx1MDQzRFx1MDQ1Ni5cIik7XG59XG5cblxuZnVuY3Rpb24gcmVuZGVyU3RhdHVzU2VjdGlvbihcbiAgICBncmlkOiBIVE1MRWxlbWVudCxcbiAgICBhcHA6IEFwcCxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgIHRhc2tzOiBUYXNrSXRlbVtdLFxuICAgIGVtcHR5VGV4dDogc3RyaW5nXG4pOiB2b2lkIHtcblxuICAgIGNvbnN0IHNlY3Rpb24gPSBncmlkLmNyZWF0ZURpdih7Y2xzOiBgdGFzay1zZWN0aW9uICR7Y2xhc3NOYW1lfWB9KTtcblxuICAgIHNlY3Rpb24uY3JlYXRlRWwoXCJoM1wiLCB7dGV4dDogdGl0bGV9KTtcblxuICAgIHJlbmRlclRhc2tMaXN0KHNlY3Rpb24sIGFwcCwgdGFza3MsIGVtcHR5VGV4dCk7XG59XG5cblxuZnVuY3Rpb24gcmVuZGVyVGFza0xpc3QoXG4gICAgc2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgYXBwOiBBcHAsXG4gICAgdGFza3M6IFRhc2tJdGVtW10sXG4gICAgZW1wdHlUZXh0OiBzdHJpbmdcbik6IHZvaWQge1xuXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBcbiAgICAgICAgc2VjdGlvbi5jcmVhdGVFbChcInBcIiwge3RleHQ6IGVtcHR5VGV4dCwgY2xzOiBcInRhc2stZW1wdHlcIn0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ID0gc2VjdGlvbi5jcmVhdGVFbChcIm9sXCIpO1xuXG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpdGVtID0gbGlzdC5jcmVhdGVFbChcImxpXCIpO1xuICAgICAgICBjb25zdCBsaW5rID0gaXRlbS5jcmVhdGVFbChcImFcIiwge3RleHQ6IHRhc2suZmlsZS5iYXNlbmFtZSwgY2xzOiBcImludGVybmFsLWxpbmtcIn0pO1xuICAgICAgICBcbiAgICAgICAgbGluay5kYXRhc2V0LmhyZWYgPSB0YXNrLmZpbGUucGF0aDtcblxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdm9pZCBhcHAud29ya3NwYWNlLmdldExlYWYoZmFsc2UpLm9wZW5GaWxlKHRhc2suZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsICJpbXBvcnQgeyBBcHAsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGVhcm5pbmdJdGVte1xuICAgIGZpbGU6IFRGaWxlO1xuICAgIHByb2dyZXNzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZWFybmluZ0l0ZW1zKGFwcDogQXBwLCBsaW1pdCA9IDcpOiBMZWFybmluZ0l0ZW1bXSB7XG4gICAgY29uc3QgaXRlbXM6IExlYXJuaW5nSXRlbVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKSkge1xuXG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuICAgICAgICBjb25zdCBmcm9udG1hdHRlciA9IGNhY2hlPy5mcm9udG1hdHRlcjtcblxuICAgICAgICBpZiAoIWZyb250bWF0dGVyKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9udG1hdHRlci50eXBlICE9PSBcImxlYXJuaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb250bWF0dGVyLnByb2dyZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBOdW1iZXIoZnJvbnRtYXR0ZXIucHJvZ3Jlc3MpO1xuXG4gICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHByb2dyZXNzKSB8fCBwcm9ncmVzcyA+PSAxMDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMucHVzaCh7ZmlsZSwgcHJvZ3Jlc3N9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXMuc29ydCgoYSwgYikgPT4gYi5wcm9ncmVzcyAtIGEucHJvZ3Jlc3MpLnNsaWNlKDAsIGxpbWl0KVxufSIsICJpbXBvcnQgeyBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGdldExlYXJuaW5nSXRlbXMgfSBmcm9tIFwiLi4vZGF0YS9MZWFybmluZ0RhdGFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxlYXJuaW5nKGNvbnRhaW5lcjpIVE1MRWxlbWVudCwgYXBwOiBBcHApOiB2b2lkIHtcbiAgICBcbiAgICBjb25zdCBibG9jayA9IGNvbnRhaW5lci5jcmVhdGVEaXYoe2NsczogXCJkYXNoYm9hcmQtYmxvY2sgbGVhcm5pbmdcIn0pO1xuICAgIGJsb2NrLmNyZWF0ZUVsKFwiaDJcIiwge3RleHQ6IFwiXHUwNDFEXHUwNDMwXHUwNDMyXHUwNDQ3XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGXCJ9KTtcbiAgICBjb25zdCBpdGVtcyA9IGdldExlYXJuaW5nSXRlbXMoYXBwKTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgXG4gICAgICAgIGJsb2NrLmNyZWF0ZUVsKFwicFwiLCB7dGV4dDogXCJcdTA0MTBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDQ3XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGIFx1MDQzMlx1MDQ1Nlx1MDQzNFx1MDQ0MVx1MDQ0M1x1MDQ0Mlx1MDQzRFx1MDQ1NC5cIn0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ID0gYmxvY2suY3JlYXRlRGl2KHtjbHM6IFwibGVhcm5pbmctbGlzdFwifSk7XG5cbiAgICBmb3IgKGNvbnN0IGNvdXJzZSBvZiBpdGVtcykge1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0LmNyZWF0ZURpdih7Y2xzOiBcImxlYXJuaW5nLWl0ZW1cIn0pO1xuICAgICAgICBjb25zdCBsaW5rID0gaXRlbS5jcmVhdGVFbChcImFcIiwge3RleHQ6IGNvdXJzZS5maWxlLmJhc2VuYW1lLCBjbHM6IFwiaW50ZXJuYWwtbGlua1wifSk7XG5cbiAgICAgICAgbGluay5kYXRhc2V0LmhyZWYgPSBjb3Vyc2UuZmlsZS5wYXRoO1xuXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2b2lkIGFwcC53b3Jrc3BhY2UuZ2V0TGVhZihmYWxzZSkub3BlbkZpbGUoY291cnNlLmZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdGVtLmNyZWF0ZUVsKFwic3BhblwiLCB7dGV4dDogYCR7Y291cnNlLnByb2dyZXNzfSVgLCBjbHM6IFwibGVhcm5pbmctcHJvZ3Jlc3NcIn0pO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgQXBwLCBOb3RpY2UgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGNyZWF0ZU5vdGVNb2RhbCB9IGZyb20gXCIuLi9tb2RhbHMvQ3JlYXRlTm90ZU1vZGFsXCI7XG5pbXBvcnQgeyBjcmVhdGVEZWFkbGluZSB9IGZyb20gXCIuLi9kYXRhL0RlYWRsaW5lRGF0YVwiOyBcbmltcG9ydCB7IGNyZWF0ZURlYWRsaW5lTW9kYWwgfSBmcm9tIFwiLi4vbW9kYWxzL0NyZWF0ZURlYWRsaW5lTW9kYWxcIjsgXG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0IH0gZnJvbSBcIi4uL2RhdGEvUHJvamVjdERhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZVByb2plY3RNb2RhbCB9IGZyb20gXCIuLi9tb2RhbHMvQ3JlYXRlUHJvamVjdE1vZGFsXCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrIH0gZnJvbSBcIi4uL2RhdGEvVGFza3NEYXRhXCI7XG5pbXBvcnQgeyBDcmVhdGVUYXNrTW9kYWwgfSBmcm9tIFwiLi4vbW9kYWxzL0NyZWF0ZVRhc2tNb2RhbFwiO1xuaW1wb3J0IHsgc2VhcmNoRmlsZXMgfSBmcm9tIFwiLi4vZGF0YS9TZWFyY2hEYXRhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJRdWlja0FjdGlvbnMoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgYXBwOiBBcHApOiB2b2lkIHtcblxuICAgIGNvbnN0IGJsb2NrID0gY29udGFpbmVyLmNyZWF0ZURpdih7Y2xzOiBcImRhc2hib2FyZC1ibG9jayBxdWljay1hY3Rpb25zXCJ9KTtcblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBcdTA0MUZcdTA0MTBcdTA0MURcdTA0MTVcdTA0MUJcdTA0MkMgXHUwNDIxXHUwNDIyXHUwNDEyXHUwNDFFXHUwNDIwXHUwNDE1XHUwNDFEXHUwNDFEXHUwNDJGXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBjcmVhdGVQYW5lbCA9IGJsb2NrLmNyZWF0ZURpdih7Y2xzOiBcInF1aWNrLWNyZWF0ZVwifSk7XG4gICAgY29uc3QgY3JlYXRlTGVmdCA9IGNyZWF0ZVBhbmVsLmNyZWF0ZURpdih7Y2xzOiBcInF1aWNrLWNyZWF0ZS1sZWZ0XCJ9KTtcbiAgICBjb25zdCBub3RlQnV0dG9uID0gY3JlYXRlTGVmdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgIHRleHQ6IFwiKyBcdTA0MURcdTA0M0VcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0FcdTA0MzBcIixcbiAgICAgICAgY2xzOiBcInF1aWNrLWFjdGlvbi1idXR0b25cIlxuICAgIH0pO1xuICAgIG5vdGVCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJcdTA0MjFcdTA0NDJcdTA0MzJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzggXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDQzIFx1MDQzRFx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQ0M1wiKTtcblxuICAgIGNvbnN0IGRlYWRsaW5lQnV0dG9uID0gY3JlYXRlTGVmdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgIHRleHQ6IFwiKyBcdTA0MTRcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICAgICAgY2xzOiBcInF1aWNrLWFjdGlvbi1idXR0b25cIlxuICAgIH0pO1xuICAgIGRlYWRsaW5lQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiXHUwNDIxXHUwNDQyXHUwNDMyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4IFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQzOSBcdTA0MzRcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIik7XG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFx1MDQxRlx1MDQxRVx1MDQyOFx1MDQyM1x1MDQxQVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGNyZWF0ZVBhbmVsLmNyZWF0ZURpdih7Y2xzOiBcInF1aWNrLXNlYXJjaFwifSk7XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBzZWFyY2hDb250YWluZXIuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTA0MUZcdTA0M0VcdTA0NDhcdTA0NDNcdTA0M0EgXHUwNDNGXHUwNDNFIFx1MDQ0MVx1MDQ0NVx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0OVx1MDQ0My4uLlwiXG4gICAgfSk7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHNlYXJjaENvbnRhaW5lci5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwicXVpY2stc2VhcmNoLXJlc3VsdHNcIlxuICAgIH0pO1xuXG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy5lbXB0eSgpO1xuXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xuXG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gc2VhcmNoRmlsZXMoYXBwLCBxdWVyeSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzZWFyY2hSZXN1bHRzLmNyZWF0ZUVsKFwiYnV0dG9uXCIse1xuICAgICAgICAgICAgICAgIHRleHQ6IGZpbGUuYmFzZW5hbWUsXG4gICAgICAgICAgICAgICAgY2xzOiBcInF1aWNrLXNlYXJjaC1yZXN1bHRcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgYXBwLndvcmtzcGFjZVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TGVhZihmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgLm9wZW5GaWxlKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuZW1wdHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFx1MDQxRlx1MDQyMFx1MDQxMFx1MDQxMlx1MDQxMCBcdTA0MTNcdTA0MjBcdTA0MjNcdTA0MUZcdTA0MTBcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBjcmVhdGVSaWdodCA9IGNyZWF0ZVBhbmVsLmNyZWF0ZURpdih7Y2xzOiBcInF1aWNrLWNyZWF0ZS1yaWdodFwifSk7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbiA9IGNyZWF0ZVJpZ2h0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgdGV4dDogXCIrIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQzOFwiLFxuICAgICAgICBjbHM6IFwicXVpY2stYWN0aW9uLWJ1dHRvblwiXG4gICAgfSk7XG4gICAgcHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXCIpO1xuXG4gICAgY29uc3QgdGFza0J1dHRvbiA9IGNyZWF0ZVJpZ2h0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgdGV4dDogXCIrIFx1MDQxN1x1MDQzMFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwiLFxuICAgICAgICBjbHM6IFwicXVpY2stYWN0aW9uLWJ1dHRvblwiXG4gICAgfSk7XG4gICAgdGFza0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGXCIpO1xuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBcdTA0MURcdTA0MTBcdTA0MTJcdTA0MDZcdTA0MTNcdTA0MTBcdTA0MjZcdTA0MDZcdTA0MkZcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBuYXZpZ2F0aW9uUGFuZWwgPSBibG9jay5jcmVhdGVEaXYoe2NsczogXCJxdWljay1uYXZpZ2F0aW9uXCJ9KTtcbiAgICBjb25zdCBzdGF0aXN0aWNzQnV0dG9uID0gbmF2aWdhdGlvblBhbmVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgdGV4dDogXCJcdTA0MjFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0FcdTA0MzBcIixcbiAgICAgICAgY2xzOiBcInF1aWNrLW5hdmlnYXRpb24tYnV0dG9uXCJcbiAgICB9KTtcbiAgICBzdGF0aXN0aWNzQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiXHUwNDEyXHUwNDU2XHUwNDM0XHUwNDNBXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQVx1MDQ0M1wiKTtcblxuICAgIGNvbnN0IGxpYnJhcnlCdXR0b24gPSBuYXZpZ2F0aW9uUGFuZWwuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICB0ZXh0OiBcIlx1MDQxMVx1MDQ1Nlx1MDQzMVx1MDQzQlx1MDQ1Nlx1MDQzRVx1MDQ0Mlx1MDQzNVx1MDQzQVx1MDQzMFwiLFxuICAgICAgICBjbHM6IFwicXVpY2stbmF2aWdhdGlvbi1idXR0b25cIlxuICAgIH0pO1xuICAgIGxpYnJhcnlCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJcdTA0MTJcdTA0NTZcdTA0MzRcdTA0M0FcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzggXHUwNDMxXHUwNDU2XHUwNDMxXHUwNDNCXHUwNDU2XHUwNDNFXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQzXCIpO1xuXG4gICAgY29uc3Qgc2V0dGluZ3NCdXR0b24gPSBuYXZpZ2F0aW9uUGFuZWwuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICB0ZXh0OiBcIlx1MDQxRFx1MDQzMFx1MDQzQlx1MDQzMFx1MDQ0OFx1MDQ0Mlx1MDQ0M1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwiLFxuICAgICAgICBjbHM6IFwicXVpY2stbmF2aWdhdGlvbi1idXR0b25cIlxuICAgIH0pO1xuICAgIHNldHRpbmdzQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiXHUwNDEyXHUwNDU2XHUwNDM0XHUwNDNBXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4IFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQzMFx1MDQ0OFx1MDQ0Mlx1MDQ0M1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwiKTtcblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gXHUwNDIyXHUwNDE4XHUwNDFDXHUwNDI3XHUwNDEwXHUwNDIxXHUwNDFFXHUwNDEyXHUwNDA2IFx1MDQxN1x1MDQxMFx1MDQxM1x1MDQxQlx1MDQyM1x1MDQyOFx1MDQxQVx1MDQxOC1cdTA0MUVcdTA0MTFcdTA0MjBcdTA0MUVcdTA0MTFcdTA0MURcdTA0MThcdTA0MUFcdTA0MThcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBub3RlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIG5ldyBjcmVhdGVOb3RlTW9kYWwoYXBwLCBhc3luYyAobmFtZSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZShgJHtuYW1lfS5tZGAsIFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgYXBwLndvcmtzcGFjZS5nZXRMZWFmKGZhbHNlKS5vcGVuRmlsZShmaWxlKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTA0MURcdTA0MzUgXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0M0RcdTA0M0VcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0FcdTA0NDMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vcGVuKCk7XG4gICAgfSk7XG5cbiAgICBkZWFkbGluZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBuZXcgY3JlYXRlRGVhZGxpbmVNb2RhbChhcHAsIGFzeW5jIChuYW1lLCBkYXRlLCB0aW1lKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVEZWFkbGluZShhcHAsIG5hbWUsIGRhdGUsIHRpbWUpO1xuICAgICAgICB9KS5vcGVuKCk7XG4gICAgfSk7XG5cbiAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIG5ldyBjcmVhdGVQcm9qZWN0TW9kYWwoYXBwLCBhc3luYyAobmFtZSwgdmVyc2lvbiwgY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVByb2plY3QoYXBwLCBuYW1lLCB2ZXJzaW9uLCBjYXRlZ29yeSk7XG4gICAgICAgIH0pLm9wZW4oKTtcbiAgICB9KTtcblxuICAgIHRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbmV3IENyZWF0ZVRhc2tNb2RhbChhcHAsIGFzeW5jIChuYW1lLCBwcmlvcml0eSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgY3JlYXRlVGFzayhhcHAsIG5hbWUsIHByaW9yaXR5KTtcbiAgICAgICAgfSkub3BlbigpO1xuICAgIH0pO1xuXG4gICAgc3RhdGlzdGljc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHUwNDI0XHUwNDQzXHUwNDNEXHUwNDNBXHUwNDQ2XHUwNDU2XHUwNDNFXHUwNDNEXHUwNDMwXHUwNDNCIFx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzOFx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0MzIgXHUwNDQwXHUwNDNFXHUwNDM3XHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQ2XHUwNDU2LlwiKTtcbiAgICB9KTtcblxuICAgIGxpYnJhcnlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbmV3IE5vdGljZShcIlx1MDQyNFx1MDQ0M1x1MDQzRFx1MDQzQVx1MDQ0Nlx1MDQ1Nlx1MDQzRVx1MDQzRFx1MDQzMFx1MDQzQiBcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzhcdTA0NDJcdTA0NENcdTA0NDFcdTA0NEYgXHUwNDMyIFx1MDQ0MFx1MDQzRVx1MDQzN1x1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0Nlx1MDQ1Ni5cIik7XG4gICAgfSk7XG5cbiAgICBzZXR0aW5nc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHUwNDI0XHUwNDQzXHUwNDNEXHUwNDNBXHUwNDQ2XHUwNDU2XHUwNDNFXHUwNDNEXHUwNDMwXHUwNDNCIFx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzOFx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0MzIgXHUwNDQwXHUwNDNFXHUwNDM3XHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQ2XHUwNDU2LlwiKTtcbiAgICB9KTtcblxuXG4gICAgdm9pZCBhcHA7XG59IiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgY3JlYXRlTm90ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXG4gICAgb25TdWJtaXQ6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgb25TdWJtaXQ6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICAgIH1cblxuICAgIG9uT3BlbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHt0ZXh0OiBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0NDMgXHUwNDNEXHUwNDNFXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDNBXHUwNDQzXCJ9KTtcblxuICAgICAgICBjb25zdCBpbnB1dCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXHUwNDFEXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDMwIFx1MDQzRFx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQzOC4uLlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uID0gY29udGVudEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDIxXHUwNDQyXHUwNDMyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4XCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTm90ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTA0MTJcdTA0MzJcdTA0MzVcdTA0MzRcdTA0NTZcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDQzIFx1MDQzRFx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQzOC5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uU3VibWl0KG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlTm90ZSk7XG5cbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5vdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59IiwgImltcG9ydCB7IEFwcCwgTm90aWNlfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZnVuY3Rpb24gZm9ybWF0RGF0ZVRpbWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFkID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpLFxuICAgICAgICBwYWQoZGF0ZS5nZXREYXRlKCkpXG4gICAgXS5qb2luKFwiLVwiKSArIFwiIFwiICsgW1xuICAgICAgICBwYWQoZGF0ZS5nZXRIb3VycygpKSxcbiAgICAgICAgcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICAgIF0uam9pbihcIjpcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVEZWFkbGluZShcbiAgICBhcHA6IEFwcCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZGF0ZTogc3RyaW5nLFxuICAgIHRpbWU6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICBjb25zdCBkZWFkbGluZURhdGUgPSBgJHtkYXRlfSAke3RpbWV9YDtcbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9IGZvcm1hdERhdGVUaW1lKG5ldyBEYXRlKCkpO1xuXG4gICAgY29uc3QgY29udGVudCA9XG4gICAgYC0tLVxuICAgIHR5cGU6IGRlYWRsaW5lXG4gICAgZGVhZGxpbmUtcHJpb3JpdHk6IG5vcm1hbFxuICAgIGR0LW92ZXItZGVhZGxpbmU6ICR7ZGVhZGxpbmVEYXRlfVxuICAgIGRlYWRsaW5lLXN0YXR1czogYWN0aXZlXG4gICAgZHQtY3JlYXRlZDogJHtjcmVhdGVkRGF0ZX1cbi0tLVxuXG4jIyBcdTA0MUVcdTA0M0ZcdTA0MzhcdTA0NDFcblx1MDQxQVx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0M0VcdTA0M0ZcdTA0MzhcdTA0NDEgXHUwNDM0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXHUwNDQzLlxuXG4jIyBcdTA0MUNcdTA0MzVcdTA0NDJcdTA0MzBcblx1MDQxRVx1MDQzRlx1MDQzOFx1MDQ0MSBcdTA0NDBcdTA0MzVcdTA0MzdcdTA0NDNcdTA0M0JcdTA0NENcdTA0NDJcdTA0MzBcdTA0NDIsIFx1MDQ0Rlx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0MzhcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDMxXHUwNDQzXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Rlx1MDQzM1x1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0MzRcdTA0M0UgXHUwNDM5XHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Ri5cblxuIyMgXHUwNDFGXHUwNDNFXHUwNDMyJ1x1MDQ0Rlx1MDQzN1x1MDQzMFx1MDQzRFx1MDQ1NiBcdTA0MzRcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NDJcdTA0Mzhcblx1MDQxNFx1MDQzRVx1MDQzQVx1MDQ0M1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzOCwgXHUwNDRGXHUwNDNBXHUwNDU2IFx1MDQzMlx1MDQ1Nlx1MDQzNFx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQ0Rlx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0MzRcdTA0M0UgXHUwNDM0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXHUwNDQzLlxuXG4jIyBcdTA0MURcdTA0M0VcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0FcdTA0Mzhcblx1MDQxNFx1MDQzRVx1MDQzNFx1MDQzMFx1MDQ0Mlx1MDQzQVx1MDQzRVx1MDQzMlx1MDQzMCBcdTA0NTZcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0NTZcdTA0NEYgXHUwNDQ5XHUwNDNFXHUwNDM0XHUwNDNFIFx1MDQzNFx1MDQzNVx1MDQzNFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0My5cbmA7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlID0gYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZShgJHtuYW1lfS5tZGAsIGNvbnRlbnQpO1xuXG4gICAgICAgIGF3YWl0IGFwcC53b3Jrc3BhY2UuZ2V0TGVhZihmYWxzZSkub3BlbkZpbGUoZmlsZSk7XG5cbiAgICAgICAgbmV3IE5vdGljZShcIlx1MDQxNFx1MDQzNVx1MDQzNFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRCBcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0M0UuXCIpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHUwNDFEXHUwNDM1IFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0RiBcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzggXHUwNDM0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNELlwiKTtcbiAgICB9XG59IiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgY3JlYXRlRGVhZGxpbmVNb2RhbCBleHRlbmRzIE1vZGFsIHtcblxuICAgIG9uU3VibWl0OiAoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0ZTogc3RyaW5nLFxuICAgICAgICB0aW1lOiBzdHJpbmdcbiAgICApID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYXBwOiBBcHAsXG4gICAgICAgIG9uU3VibWl0OiAoXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICBkYXRlOiBzdHJpbmcsXG4gICAgICAgICAgICB0aW1lOiBzdHJpbmdcbiAgICAgICAgKSA9PiB2b2lkXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMub25TdWJtaXQgPSBvblN1Ym1pdDtcbiAgICB9XG5cbiAgICBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7XG4gICAgICAgICAgICB0ZXh0OlwiXHUwNDIxXHUwNDQyXHUwNDMyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4IFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQzOSBcdTA0MzRcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtZGVhZGxpbmUtdGl0bGVcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OlwiXHUwNDFEXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDMwIFx1MDQzNFx1MDQzNVx1MDQzNFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0M1wiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS1kZWFkbGluZS1sYWJlbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMCBcdTA0MzRcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NDMuLi5cIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtZGVhZGxpbmUtaW5wdXRcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OlwiXHUwNDFBXHUwNDU2XHUwNDNEXHUwNDQ2XHUwNDM1XHUwNDMyXHUwNDMwIFx1MDQzNFx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0MzJcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0RcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtZGVhZGxpbmUtbGFiZWxcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZUlucHV0ID0gY29udGVudEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTpcImRhdGVcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtZGVhZGxpbmUtaW5wdXRcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OlwiXHUwNDFBXHUwNDU2XHUwNDNEXHUwNDQ2XHUwNDM1XHUwNDMyXHUwNDM4XHUwNDM5IFx1MDQ0N1x1MDQzMFx1MDQ0MSBcdTA0MzJcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0RcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtZGVhZGxpbmUtbGFiZWxcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGltZUlucHV0ID0gY29udGVudEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTogXCJ0aW1lXCIsXG4gICAgICAgICAgICBjbHM6IFwiY3JlYXRlLWRlYWRsaW5lLWlucHV0XCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uID0gY29udGVudEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDIxXHUwNDQyXHUwNDMyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4XCIsXG4gICAgICAgICAgICBjbHM6IFwiY3JlYXRlLWRlYWRsaW5lLWJ1dHRvblwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5hbWVJbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZURlYWRsaW5lID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZGF0ZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IHRpbWVJbnB1dC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1MDQxMlx1MDQzMlx1MDQzNVx1MDQzNFx1MDQ1Nlx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0MzdcdTA0MzJcdTA0NDMgXHUwNDM0XHUwNDM1XHUwNDM0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXHUwNDQzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1MDQxMlx1MDQzQVx1MDQzMFx1MDQzNlx1MDQ1Nlx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0NTZcdTA0M0RcdTA0NDZcdTA0MzVcdTA0MzJcdTA0NDMgXHUwNDM0XHUwNDMwXHUwNDQyXHUwNDQzIFx1MDQzMlx1MDQzOFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGltZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTA0MTJcdTA0M0FcdTA0MzBcdTA0MzZcdTA0NTZcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDU2XHUwNDNEXHUwNDQ2XHUwNDM1XHUwNDMyXHUwNDM4XHUwNDM5IFx1MDQ0N1x1MDQzMFx1MDQ0MSBcdTA0MzJcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0RcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uU3VibWl0KG5hbWUsIGRhdGUsIHRpbWUpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlRGVhZGxpbmUpO1xuXG4gICAgICAgIHRpbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY3JlYXRlRGVhZGxpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59IiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgY3JlYXRlUHJvamVjdE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIG9uU3VibWl0OiAoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgdmVyc2lvbjogc3RyaW5nLFxuICAgICAgICBjYXRlZ29yeTogc3RyaW5nXG4gICAgKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFwcDogQXBwLFxuICAgICAgICBvblN1Ym1pdDogKFxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgdmVyc2lvbjogc3RyaW5nLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHN0cmluZ1xuICAgICAgICApID0+IHZvaWRcbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICAgIH1cblxuICAgIG9uT3BlbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTA0MjFcdTA0NDJcdTA0MzJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzggXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0MlwiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS1wcm9qZWN0LXRpdGxlXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTA0MURcdTA0MzBcdTA0MzdcdTA0MzJcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzXCIsXG4gICAgICAgICAgICBjbHM6IFwiY3JlYXRlLXByb2plY3QtbGFiZWxcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY29udGVudEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTA0MURcdTA0MzBcdTA0MzdcdTA0MzJcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzLi4uXCIsXG4gICAgICAgICAgICBjbHM6IFwiY3JlYXRlLXByb2plY3QtaW5wdXRcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0MVx1MDQ1Nlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NDNcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtcHJvamVjdC1sYWJlbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2ZXJzaW9uSW5wdXQgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0MVx1MDQ1Nlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NDMuLi5cIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtcHJvamVjdC1pbnB1dFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImxhYmVsXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDFBXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDMzXHUwNDNFXHUwNDQwXHUwNDU2XHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQ0M1wiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS1wcm9qZWN0LWxhYmVsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5SW5wdXQgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1MDQxQVx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzM1x1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NTRcdTA0M0FcdTA0NDJcdTA0NDMuLi5cIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtcHJvamVjdC1pbnB1dFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOFwiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS1wcm9qZWN0LWJ1dHRvblwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5hbWVJbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSB2ZXJzaW9uSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBjYXRlZ29yeUlucHV0LnZhbHVlLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1MDQxMlx1MDQzMlx1MDQzNVx1MDQzNFx1MDQ1Nlx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0MzdcdTA0MzJcdTA0NDMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1MDQxMlx1MDQzMlx1MDQzNVx1MDQzNFx1MDQ1Nlx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDFcdTA0NTZcdTA0NEUgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDU0XHUwNDNBXHUwNDQyXHUwNDQzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTA0MTJcdTA0MzJcdTA0MzVcdTA0MzRcdTA0NTZcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDMzXHUwNDNFXHUwNDQwXHUwNDU2XHUwNDRFIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ1NFx1MDQzQVx1MDQ0Mlx1MDQ0M1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25TdWJtaXQobmFtZSwgdmVyc2lvbiwgY2F0ZWdvcnkpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlUHJvamVjdCk7XG5cbiAgICAgICAgY2F0ZWdvcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVUYXNrTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cbiAgICBvblN1Ym1pdDogKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIHByaW9yaXR5OiBzdHJpbmdcbiAgICApID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYXBwOiBBcHAsXG4gICAgICAgIG9uU3VibWl0OiAoXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICBwcmlvcml0eTogc3RyaW5nXG4gICAgICAgICkgPT4gdm9pZFxuICAgICkge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLm9uU3VibWl0ID0gb25TdWJtaXQ7XG4gICAgfVxuXG4gICAgb25PcGVuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOCBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRGXCIsXG4gICAgICAgICAgICBjbHM6IFwiY3JlYXRlLXRhc2stdGl0bGVcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEZcIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtdGFzay1sYWJlbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEYuLi5cIixcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtdGFzay1pbnB1dFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImxhYmVsXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDFGXHUwNDQwXHUwNDU2XHUwNDNFXHUwNDQwXHUwNDU2XHUwNDQyXHUwNDM1XHUwNDQyIFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0RlwiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS10YXNrLWxhYmVsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gY29udGVudEVsLmNyZWF0ZUVsKFwic2VsZWN0XCIsIHtcbiAgICAgICAgICAgIGNsczogXCJjcmVhdGUtdGFzay1pbnB1dFwiXG4gICAgICAgIH0pO1xuICAgICAgICBwcmlvcml0eVNlbGVjdC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQxMlx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzQVx1MDQzOFx1MDQzOVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiaGlnaFwiXG4gICAgICAgIH0pO1xuICAgICAgICBwcmlvcml0eVNlbGVjdC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQxN1x1MDQzMlx1MDQzOFx1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQzOFx1MDQzOVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwibm9ybWFsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHByaW9yaXR5U2VsZWN0LmNyZWF0ZUVsKFwib3B0aW9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQ1Nlx1MDQzRVx1MDQ0MFx1MDQ1Nlx1MDQ0Mlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzQ1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwibm9uZVwiXG4gICAgICAgIH0pO1xuICAgICAgICBwcmlvcml0eVNlbGVjdC52YWx1ZSA9IFwibm9uZVwiO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MDQyMVx1MDQ0Mlx1MDQzMlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOFwiLFxuICAgICAgICAgICAgY2xzOiBcImNyZWF0ZS10YXNrLWJ1dHRvblwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5hbWVJbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZVRhc2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gcHJpb3JpdHlTZWxlY3QudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTA0MTJcdTA0MzJcdTA0MzVcdTA0MzRcdTA0NTZcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDQzIFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Ri5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uU3VibWl0KG5hbWUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVRhc2spO1xuXG4gICAgICAgIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY3JlYXRlVGFzaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoRmlsZXMoXG4gICAgYXBwOiBBcHAsXG4gICAgcXVlcnk6IHN0cmluZ1xuKTogVEZpbGVbXSB7XG4gICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghc2VhcmNoUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBhcHAudmF1bHRcbiAgICAgICAgLmdldE1hcmtkb3duRmlsZXMoKVxuICAgICAgICAuZmlsdGVyKGZpbGUgPT5cbiAgICAgICAgICAgIGZpbGUuYmFzZW5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeSlcbiAgICAgICAgKTtcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLG1CQUlROzs7QUNKUixzQkFBNEI7OztBQ2tCckIsSUFBTSxpQkFBaUM7QUFBQSxFQUMxQyxFQUFDLE1BQU0sVUFBVSxNQUFNLGdCQUFnQixNQUFNLGlGQUFlO0FBQUEsRUFDNUQsRUFBQyxNQUFNLFVBQVUsTUFBTSxnQkFBZ0IsTUFBTSwrREFBWTtBQUFBLEVBQ3pELEVBQUMsTUFBTSxVQUFVLE1BQU0sa0JBQWtCLE1BQU0sMkVBQWM7QUFBQSxFQUM3RCxFQUFDLE1BQU0sVUFBVSxNQUFNLGVBQWUsTUFBTSxtREFBVTtBQUFBLEVBQ3RELEVBQUMsTUFBTSxVQUFVLE1BQU0sZ0JBQWdCLE1BQU0sK0RBQVk7QUFBQSxFQUN6RCxFQUFDLE1BQU0sVUFBVSxNQUFNLG9CQUFvQixNQUFNLHlJQUEwQjtBQUMvRTtBQUVPLFNBQVMsWUFBWSxLQUF5QjtBQTNCckQ7QUE0QkksUUFBTSxXQUEwQixDQUFDO0FBRWpDLGFBQVcsUUFBUSxJQUFJLE1BQU0saUJBQWlCLEdBQUc7QUFDN0MsVUFBTSxRQUFRLElBQUksY0FBYyxhQUFhLElBQUk7QUFDakQsVUFBTSxjQUFjLCtCQUFPO0FBRTNCLFFBQUksQ0FBQyxhQUFhO0FBQ2Q7QUFBQSxJQUNKO0FBRUEsUUFBSSxZQUFZLFNBQVMsV0FBVztBQUNoQztBQUFBLElBQ0o7QUFFQSxhQUFTLEtBQUs7QUFBQSxNQUNWO0FBQUEsTUFDQSxPQUFPLEtBQUs7QUFBQSxNQUNaLFFBQVEsUUFBTyxpQkFBWSxXQUFaLFlBQXNCLEVBQUU7QUFBQSxNQUN2QyxPQUFPLFlBQVksUUFBUSxPQUFPLFlBQVksS0FBSyxJQUFJO0FBQUEsTUFDdkQsV0FBVyxZQUFZLFlBQVksSUFBSSxPQUFPLFlBQVksWUFBWSxDQUFDLElBQUk7QUFBQSxNQUMzRSxlQUFlLFlBQVksZ0JBQWdCLE1BQU0sU0FDM0MsT0FBTyxZQUFZLGdCQUFnQixDQUFDLElBQUk7QUFBQSxNQUM5QyxpQkFBaUIsWUFBWSxrQkFBa0IsTUFBTSxTQUMvQyxPQUFPLFlBQVksa0JBQWtCLENBQUMsSUFBSTtBQUFBLElBQ3BELENBQUM7QUFBQSxFQUNMO0FBRUEsU0FBTztBQUNYO0FBRU8sU0FBUyxnQkFBZ0IsTUFBK0M7QUExRC9FO0FBMkRJLE1BQUksQ0FBQyxNQUFNO0FBQ1AsV0FBTztBQUFBLEVBQ1g7QUFFQSxVQUFPLG9CQUFlLEtBQUssV0FBUyxNQUFNLFNBQVMsSUFBSSxNQUFoRCxZQUFxRDtBQUNoRTtBQUVBLGVBQXNCLGNBQ2xCLEtBQ0EsTUFDQSxTQUNBLFVBQ2E7QUFFYixRQUFNLE1BQU0sb0JBQUksS0FBSztBQUVyQixRQUFNLE1BQU0sQ0FBQyxVQUEwQjtBQUNuQyxXQUFPLE9BQU8sS0FBSyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQUEsRUFDeEM7QUFFQSxRQUFNLGNBQ04sR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUNqQixJQUFJLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUN2QixJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsSUFDbEIsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLElBQ25CLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztBQUV4QixRQUFNLFVBQ047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUtvQixRQUFRO0FBQUEsa0JBQ2QsV0FBVztBQUFBO0FBQUE7QUFBQSxlQUdkLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JsQixNQUFJO0FBQ0EsVUFBTSxPQUFPLE1BQU0sSUFBSSxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sT0FBTztBQUV6RCxVQUFNLElBQUksVUFBVSxRQUFRLEtBQUssRUFBRSxTQUFTLElBQUk7QUFBQSxFQUNwRCxTQUFTLE9BQU87QUFDWixZQUFRLE1BQU0sNkJBQTZCLEtBQUs7QUFBQSxFQUNwRDtBQUNKO0FBRU8sU0FBUyxrQkFBa0IsS0FBOEI7QUEvSGhFO0FBZ0lJLFVBQ0ksaUJBQVksR0FBRyxFQUNWLEtBQUssYUFBVyxRQUFRLFdBQVcsU0FBUyxNQURqRCxZQUNzRDtBQUU5RDs7O0FEaklRLFNBQVMsZUFDYixXQUNBLEtBQ0s7QUFFTCxRQUFNLFFBQVEsVUFBVSxVQUFVO0FBQUEsSUFDOUIsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sT0FBTyxNQUFNLFVBQVU7QUFBQSxJQUN6QixLQUFLO0FBQUEsRUFDVCxDQUFDO0FBRUQsUUFBTSxVQUFVLEtBQUssVUFBVTtBQUFBLElBQzNCLEtBQUs7QUFBQSxFQUNULENBQUM7QUFFRCxRQUFNLFlBQVksS0FBSyxVQUFVO0FBQUEsSUFDN0IsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVEO0FBQUEsSUFDSTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBRUE7QUFBQSxJQUNJO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDSDtBQUVELFNBQVMscUJBQ0wsV0FDQSxPQUNBLFFBQ0EsWUFDQSxLQUNJO0FBRUosWUFBVSxTQUFTLE1BQU07QUFBQSxJQUNyQixNQUFNO0FBQUEsRUFDVixDQUFDO0FBRUQsUUFBTSxXQUFXLFlBQVksR0FBRyxFQUMzQixPQUFPLGFBQVcsUUFBUSxXQUFXLE1BQU0sRUFDM0MsTUFBTSxHQUFHLENBQUM7QUFFZixNQUFJLFNBQVMsV0FBVyxHQUFHO0FBRXZCLGNBQVUsU0FBUyxLQUFLO0FBQUEsTUFDcEIsTUFBTTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBRUwsT0FBTztBQUVILFVBQU0sT0FBTyxVQUFVLFNBQVMsSUFBSTtBQUVwQyxlQUFXLFdBQVcsVUFBVTtBQUU1QixZQUFNLE9BQU8sS0FBSyxTQUFTLElBQUk7QUFFL0IsWUFBTSxPQUFPLEtBQUssU0FBUyxLQUFLO0FBQUEsUUFDNUIsTUFBTSxRQUFRO0FBQUEsUUFDZCxLQUFLO0FBQUEsTUFDVCxDQUFDO0FBRUQsV0FBSyxpQkFBaUIsU0FBUyxDQUFDLFVBQVU7QUFFdEMsY0FBTSxlQUFlO0FBQ3JCLGFBQUssSUFBSSxVQUNKLFFBQVEsS0FBSyxFQUNiLFNBQVMsUUFBUSxJQUFJO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBRUEsUUFBTSxTQUFTLFVBQVUsU0FBUyxVQUFVO0FBQUEsSUFDeEMsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU87QUFBQSxJQUFhO0FBQUEsSUFBUyxXQUFXLGFBQ3BDLHdNQUF3QztBQUFBLEVBQzVDO0FBRUEsU0FBTyxpQkFBaUIsU0FBUyxNQUFNO0FBQ25DLFFBQUksdUJBQU8sMExBQW9DO0FBQUEsRUFDbkQsQ0FBQztBQUNMOzs7QUUvRkEsU0FBUyxlQUFlLE9BQW1DO0FBQ3ZELE1BQUksQ0FBQyxPQUFPO0FBQ1IsV0FBTztBQUFBLEVBQ1g7QUFFQSxTQUFPLE9BQU8sT0FBTyxNQUFNLFFBQVEsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNsRDtBQUVPLFNBQVMscUJBQXFCLFdBQXdCLEtBQWdCO0FBWDdFO0FBYUksUUFBTSxRQUFRLFVBQVUsVUFBVTtBQUFBLElBQzlCLEtBQUs7QUFBQSxFQUNULENBQUM7QUFHRCxRQUFNLFVBQVUsa0JBQWtCLEdBQUc7QUFDckMsUUFBTSxRQUFRLGdCQUFnQixtQ0FBUyxTQUFTO0FBRWhELE1BQUksQ0FBQyxTQUFTO0FBQ1YsVUFBTSxTQUFTLE1BQU07QUFBQSxNQUNqQixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsVUFBTSxTQUFTLEtBQUs7QUFBQSxNQUNoQixNQUFNO0FBQUEsSUFDVixDQUFDO0FBRUQ7QUFBQSxFQUNKO0FBRUEsUUFBTSxRQUFRLE1BQU0sU0FBUyxNQUFNO0FBQUEsSUFDL0IsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUFBLElBQzdCLE1BQU0sUUFBUTtBQUFBLElBQ2QsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELE9BQUssaUJBQWlCLFNBQVMsQ0FBQyxVQUFVO0FBQ3RDLFVBQU0sZUFBZTtBQUVyQixTQUFLLElBQUksVUFDSixRQUFRLEtBQUssRUFDYixTQUFTLFFBQVEsSUFBSTtBQUFBLEVBQzlCLENBQUM7QUFFRCxRQUFNLGNBQWMsTUFBTSxVQUFVO0FBQUEsSUFDaEMsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sU0FBUyxZQUFZLFNBQVMsS0FBSztBQUFBLElBQ3JDLEtBQUsseUJBQXlCLFFBQVEsTUFBTTtBQUFBLEVBQ2hELENBQUM7QUFFRCxTQUFPLFdBQVcsRUFBQyxNQUFNLHlDQUFVLENBQUM7QUFDcEMsU0FBTyxXQUFXO0FBQUEsSUFDZCxNQUFNLFFBQVEsT0FBTyxZQUFZO0FBQUEsSUFDakMsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUVELGNBQVksU0FBUyxLQUFLO0FBQUEsSUFDdEIsTUFBTSxrQ0FBUyxlQUFlLFFBQVEsS0FBSyxDQUFDLE1BQUssb0NBQU8sU0FBUCxZQUFlLEdBQUc7QUFBQSxFQUN2RSxDQUFDO0FBRUQsY0FBWSxTQUFTLEtBQUs7QUFBQSxJQUN0QixNQUFNLHlFQUFpQixhQUFRLGtCQUFSLFlBQXlCLENBQUM7QUFBQSxFQUNyRCxDQUFDO0FBRUQsY0FBWSxTQUFTLEtBQUs7QUFBQSxJQUN0QixNQUFNO0FBQUEsRUFDVixDQUFDO0FBRUQsY0FBWSxTQUFTLEtBQUs7QUFBQSxJQUN0QixNQUFNLDJGQUFvQixhQUFRLG9CQUFSLFlBQTJCLENBQUM7QUFBQSxFQUMxRCxDQUFDO0FBRUw7OztBQ2pGTyxTQUFTLGVBQ1osV0FDSTtBQUVKLFFBQU0sUUFBUSxVQUFVLFVBQVU7QUFBQSxJQUM5QixLQUFLO0FBQUEsRUFDVCxDQUFDO0FBRUQsUUFBTSxjQUFjLE1BQU0sVUFBVTtBQUFBLElBQ2hDLEtBQUs7QUFBQSxFQUNULENBQUM7QUFFRCxRQUFNLFFBQVEsTUFBTSxTQUFTLFNBQVM7QUFBQSxJQUNsQyxLQUFLO0FBQUEsRUFDVCxDQUFDO0FBRUQsUUFBTSxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUVBLFFBQU0sV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBRUEsUUFBTSxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFFQSxNQUFJLGlCQUFpQjtBQUNyQixNQUFJLGdCQUFnQjtBQUVwQixRQUFNLGlCQUFpQixNQUFZO0FBRS9CLFVBQU0sTUFBTSxvQkFBSSxLQUFLO0FBRXJCLFVBQU0sTUFBTTtBQUFBLE1BQ1IsSUFBSSxRQUFRO0FBQUEsSUFDaEIsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUVqQixVQUFNLFFBQVE7QUFBQSxNQUNWLElBQUksU0FBUyxJQUFJO0FBQUEsSUFDckIsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUVqQixVQUFNLE9BQU8sSUFBSSxZQUFZO0FBRTdCLFVBQU0sUUFBUTtBQUFBLE1BQ1YsSUFBSSxTQUFTO0FBQUEsSUFDakIsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUVqQixVQUFNLFVBQVU7QUFBQSxNQUNaLElBQUksV0FBVztBQUFBLElBQ25CLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFFakIsVUFBTSxVQUFVO0FBQUEsTUFDWixJQUFJLFdBQVc7QUFBQSxJQUNuQixFQUFFLFNBQVMsR0FBRyxHQUFHO0FBRWpCLGdCQUFZLGNBQ1IsR0FBRyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsSUFDdEIsR0FBRyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQ3BCLEtBQUssSUFBSSxPQUFPLElBQUksT0FBTztBQUlsQyxRQUNJLG1CQUFtQixJQUFJLFNBQVMsS0FDaEMsa0JBQWtCLElBQUksWUFBWSxHQUNwQztBQUNFO0FBQUEsSUFDSjtBQUVBLHFCQUFpQixJQUFJLFNBQVM7QUFDOUIsb0JBQWdCLElBQUksWUFBWTtBQUVoQyxVQUFNLE1BQU07QUFJWixVQUFNLFdBQVcsTUFBTSxTQUFTLE1BQU0sRUFBQyxLQUFLLHFCQUFvQixDQUFDO0FBQ2pFLFVBQU0sWUFBWSxTQUFTLFNBQVMsTUFBTTtBQUFBLE1BQ3RDLE1BQU0sV0FBVyxJQUFJLFNBQVMsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFFRCxjQUFVLFVBQVU7QUFHcEIsVUFBTSxZQUFZLE1BQU0sU0FBUyxJQUFJO0FBRXJDLGFBQVMsVUFBVSxHQUFHLFVBQVUsU0FBUyxRQUFRLFdBQVc7QUFDeEQsWUFBTSxTQUFTLFVBQVUsU0FBUyxNQUFNO0FBQUEsUUFDcEMsTUFBTSxTQUFTLE9BQU87QUFBQSxNQUMxQixDQUFDO0FBRUQsVUFBSSxZQUFZLEtBQUssWUFBWSxHQUFHO0FBQ2hDLGVBQU8sU0FBUyxTQUFTO0FBQUEsTUFDN0I7QUFBQSxJQUNKO0FBSUEsVUFBTSxXQUFXLElBQUk7QUFBQSxNQUNqQixJQUFJLFlBQVk7QUFBQSxNQUNoQixJQUFJLFNBQVM7QUFBQSxNQUNiO0FBQUEsSUFDSjtBQUtBLFVBQU0sZ0JBQ0QsU0FBUyxPQUFPLElBQUksS0FBSztBQUk5QixVQUFNLGNBQWMsSUFBSTtBQUFBLE1BQ3BCLElBQUksWUFBWTtBQUFBLE1BQ2hCLElBQUksU0FBUyxJQUFJO0FBQUEsTUFDakI7QUFBQSxJQUNKLEVBQUUsUUFBUTtBQUdWLFFBQUksWUFBWTtBQUVoQixhQUFTLE9BQU8sR0FBRyxPQUFPLEdBQUcsUUFBUTtBQUVqQyxZQUFNLE1BQU0sTUFBTSxTQUFTLElBQUk7QUFFL0IsZUFBUyxVQUFVLEdBQUcsVUFBVSxHQUFHLFdBQVc7QUFFMUMsY0FBTSxPQUFPLElBQUksU0FBUyxJQUFJO0FBRTlCLGNBQU0sV0FBVyxPQUFPLElBQUk7QUFFNUIsWUFFSSxZQUFZLGdCQUNaLGFBQWEsYUFDZjtBQUNFLGNBQUksWUFBWSxLQUFLLFlBQVksR0FBRztBQUNoQyxpQkFBSyxTQUFTLFNBQVM7QUFBQSxVQUMzQjtBQUVBLGdCQUFNLGFBQWEsS0FBSyxTQUFTLFFBQVE7QUFBQSxZQUNyQyxNQUFNLE9BQU8sU0FBUztBQUFBLFlBQ3RCLEtBQUs7QUFBQSxVQUNULENBQUM7QUFFRCxjQUFJLGNBQWMsSUFBSSxRQUFRLEdBQUc7QUFDN0IsdUJBQVcsU0FBUyxnQkFBZ0I7QUFBQSxVQUN4QztBQUVBO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUVBLGlCQUFlO0FBR2YsU0FBTyxZQUFZLGdCQUFnQixHQUFJO0FBQzNDOzs7QUN4TEEsSUFBQUMsbUJBQTJCO0FBVzNCLElBQU0sY0FBYztBQUNwQixJQUFNLFlBQVksR0FBRyxXQUFXO0FBRWhDLGVBQWUsc0JBQXNCLEtBQTBCO0FBRTNELFFBQU0sZUFBZSxJQUFJLE1BQU0sc0JBQXNCLFNBQVM7QUFFOUQsTUFBSSx3QkFBd0Isd0JBQU87QUFDL0IsV0FBTztBQUFBLEVBQ1g7QUFFQSxRQUFNLGVBQWUsSUFBSSxNQUFNLHNCQUFzQixRQUFRO0FBRTdELE1BQUksQ0FBQyxjQUFjO0FBQ2YsVUFBTSxJQUFJLE1BQU0sYUFBYSxRQUFRO0FBQUEsRUFDekM7QUFFQSxRQUFNLGFBQWEsSUFBSSxNQUFNLHNCQUFzQixXQUFXO0FBRTlELE1BQUksQ0FBQyxZQUFZO0FBQ2IsVUFBTSxJQUFJLE1BQU0sYUFBYSxXQUFXO0FBQUEsRUFDNUM7QUFFQSxRQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyxXQUFXLElBQUk7QUFFbkQsU0FBTztBQUNYO0FBR0EsZUFBZSxrQkFBa0IsS0FBc0M7QUFDbkUsUUFBTSxXQUFXLE1BQU0sc0JBQXNCLEdBQUc7QUFFaEQsTUFBSTtBQUVBLFVBQU0sVUFBVSxNQUFNLElBQUksTUFBTSxXQUFXLFFBQVE7QUFFbkQsUUFBSSxDQUFDLFFBQVEsS0FBSyxHQUFHO0FBQ2pCLGFBQU8sQ0FBQztBQUFBLElBQ1o7QUFFQSxVQUFNLFNBQVMsS0FBSyxNQUFNLE9BQU87QUFFakMsUUFBSSxDQUFDLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDeEIsYUFBTyxDQUFDO0FBQUEsSUFDWjtBQUVBLFdBQU8sT0FBTztBQUFBLE1BQ1YsQ0FBQyxVQUNHLE9BQU8sVUFBVSxZQUNyQixVQUFVLFFBQ1YsVUFBVSxTQUNWLE9BQU8sTUFBTSxTQUFTO0FBQUEsSUFDMUI7QUFBQSxFQUVKLFNBQVMsT0FBTztBQUVaLFlBQVE7QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFFQSxXQUFNLENBQUM7QUFBQSxFQUNYO0FBQ0o7QUFHQSxlQUFzQixtQkFBbUIsS0FBVSxNQUFhLFFBQVEsSUFBbUI7QUFFdkYsTUFBSSxLQUFLLFNBQVMsV0FBVztBQUN6QjtBQUFBLEVBQ0o7QUFFQSxRQUFNLFVBQVUsTUFBTSxrQkFBa0IsR0FBRztBQUczQyxRQUFNLFdBQVcsUUFBUSxPQUFPLFdBQVMsTUFBTSxTQUFTLEtBQUssSUFBSTtBQUdqRSxXQUFTLFFBQVEsRUFBQyxNQUFNLEtBQUssS0FBSSxDQUFDO0FBR2xDLFFBQU0sVUFBVSxTQUFTLE1BQU0sR0FBRyxLQUFLO0FBRXZDLFFBQU0sV0FBVyxNQUFNLHNCQUFzQixHQUFHO0FBRWhELFFBQU0sSUFBSSxNQUFNLE9BQU8sVUFBVSxLQUFLLFVBQVUsU0FBUyxNQUFNLENBQUMsQ0FBQztBQUNyRTtBQUdBLGVBQXNCLGVBQWUsS0FBUyxRQUFRLElBQStCO0FBRWpGLFFBQU0sVUFBVSxNQUFNLGtCQUFrQixHQUFHO0FBRTNDLFFBQU0sU0FBMkIsQ0FBQztBQUVsQyxhQUFXLFNBQVMsU0FBUztBQUV6QixVQUFNLE9BQU8sSUFBSSxNQUFNLHNCQUFzQixNQUFNLElBQUk7QUFFdkQsUUFBSSxnQkFBZ0Isd0JBQU87QUFFdkIsYUFBTyxLQUFLLEVBQUMsS0FBSSxDQUFDO0FBRWxCLFVBQUksT0FBTyxVQUFVLE9BQU87QUFDeEI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQ1g7OztBQ3RIQSxlQUFzQixrQkFBa0IsV0FBdUIsS0FBeUI7QUFFcEYsUUFBTSxRQUFRLFVBQVUsVUFBVTtBQUFBLElBQzlCLEtBQUs7QUFBQSxFQUNULENBQUM7QUFFRCxRQUFNLFNBQVMsTUFBTTtBQUFBLElBQ2pCLE1BQU07QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLFFBQVEsTUFBTSxlQUFlLEtBQUssRUFBRTtBQUUxQyxNQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3BCLFVBQU0sU0FBUyxLQUFLO0FBQUEsTUFDaEIsTUFBTTtBQUFBLElBQ1YsQ0FBQztBQUVEO0FBQUEsRUFDSjtBQUVBLGFBQVcsU0FBUyxPQUFPO0FBRXZCLFVBQU0sT0FBTyxNQUFNLFVBQVUsRUFBQyxLQUFLLG1CQUFrQixDQUFDO0FBRXRELFVBQU0sT0FBTyxLQUFLLFNBQVMsS0FBSztBQUFBLE1BQzVCLE1BQU0sTUFBTSxLQUFLO0FBQUEsTUFDakIsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFNBQUssUUFBUSxPQUFPLE1BQU0sS0FBSztBQUUvQixTQUFLLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUV0QyxZQUFNLGVBQWU7QUFFckIsV0FBSyxJQUFJLFVBQ0osUUFBUSxLQUFLLEVBQ2IsU0FBUyxNQUFNLElBQUk7QUFBQSxJQUM1QixDQUFDO0FBQUEsRUFDTDtBQUNKOzs7QUNqQkEsU0FBUyxPQUFPLE9BQTZCO0FBRXpDLE1BQUksaUJBQWlCLE1BQU07QUFDdkIsV0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDLElBQUksT0FBTztBQUFBLEVBQzNDO0FBRUEsTUFBSSxPQUFPLFVBQVUsWUFBWSxPQUFPLFVBQVUsVUFBVTtBQUN4RCxXQUFPO0FBQUEsRUFDWDtBQUVBLFFBQU0sT0FBTyxJQUFJLEtBQUssS0FBSztBQUUzQixTQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsSUFBSSxPQUFPO0FBQzFDO0FBR08sU0FBUyxlQUFlLEtBQVUsUUFBUSxHQUFnQjtBQUU3RCxRQUFNLE1BQU0sb0JBQUksS0FBSztBQUVyQixRQUFNLGFBQWEsSUFBSTtBQUFBLElBQ25CLElBQUksWUFBWTtBQUFBLElBQUcsSUFBSSxTQUFTO0FBQUEsSUFBRyxJQUFJLFFBQVE7QUFBQSxFQUNuRDtBQUVBLFFBQU0sV0FBVyxJQUFJO0FBQUEsSUFDakIsSUFBSSxZQUFZO0FBQUEsSUFBRyxJQUFJLFNBQVM7QUFBQSxJQUFHLElBQUksUUFBUSxJQUFJO0FBQUEsRUFDdkQ7QUFFQSxRQUFNLFNBQXNCLENBQUM7QUFFN0IsYUFBVyxRQUFRLElBQUksTUFBTSxpQkFBaUIsR0FBRztBQUU3QyxVQUFNLFFBQVEsSUFBSSxjQUFjLGFBQWEsSUFBSTtBQUNqRCxVQUFNLGNBQWMsK0JBQU87QUFFM0IsUUFBSSxDQUFDLGFBQWE7QUFDZDtBQUFBLElBQ0o7QUFFQSxRQUFJLFlBQVksU0FBUyxTQUFTO0FBQzlCO0FBQUEsSUFDSjtBQUVBLFVBQU0sWUFBWSxPQUFPLFlBQVksVUFBVSxDQUFDO0FBRWhELFFBQUksQ0FBQyxXQUFXO0FBQ1o7QUFBQSxJQUNKO0FBRUEsUUFBSSxhQUFhLGNBQWMsWUFBWSxVQUFVO0FBQ2pELGFBQU8sS0FBSyxFQUFDLE1BQU0sTUFBTSxVQUFTLENBQUM7QUFBQSxJQUN2QztBQUFBLEVBQ0o7QUFFQSxTQUFPLE9BQ0YsS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLEtBQUssUUFBUSxJQUFJLEVBQUUsS0FBSyxRQUFRLENBQUMsRUFDbEQsTUFBTSxHQUFHLEtBQUs7QUFDdkI7QUFHTyxTQUFTLG1CQUFtQixLQUFVLFFBQVEsR0FBbUI7QUFFcEUsUUFBTSxZQUE0QixDQUFDO0FBRW5DLGFBQVUsUUFBUSxJQUFJLE1BQU0saUJBQWlCLEdBQUc7QUFFNUMsVUFBTSxRQUFRLElBQUksY0FBYyxhQUFhLElBQUk7QUFFakQsVUFBTSxjQUFjLCtCQUFPO0FBRTNCLFFBQUksQ0FBQyxhQUFhO0FBQ2Q7QUFBQSxJQUNKO0FBRUEsUUFBSSxZQUFZLFNBQVMsWUFBWTtBQUNqQztBQUFBLElBQ0o7QUFFQSxRQUFJLFlBQVksaUJBQWlCLE1BQU0sVUFBVTtBQUM3QztBQUFBLElBQ0o7QUFFQSxVQUFNLGVBQWUsT0FBTyxZQUFZLGtCQUFrQixDQUFDO0FBRTNELFFBQUksQ0FBQyxjQUFjO0FBQ2Y7QUFBQSxJQUNKO0FBRUEsY0FBVSxLQUFLLEVBQUMsTUFBTSxNQUFNLGFBQVksQ0FBQztBQUFBLEVBQzdDO0FBRUEsU0FBTyxVQUNGLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLEtBQUssUUFBUSxDQUFDLEVBQ2xELE1BQU0sR0FBRyxLQUFLO0FBQ3ZCO0FBR08sU0FBUyxxQkFBcUIsS0FBNkI7QUFFOUQsUUFBTSxnQkFBZ0IsSUFBSSxNQUFNLGlCQUFpQjtBQUVqRCxNQUFJLFdBQVc7QUFDZixNQUFJLFFBQVE7QUFFWixRQUFNLE9BQU8sb0JBQUksSUFBWTtBQUU3QixhQUFXLFFBQVEsZUFBZTtBQUU5QixVQUFNLFFBQVEsSUFBSSxjQUFjLGFBQWEsSUFBSTtBQUVqRCxVQUFNLGNBQWMsK0JBQU87QUFFM0IsU0FBSSwyQ0FBYSxVQUFTLFdBQVc7QUFDakM7QUFBQSxJQUNKO0FBRUEsU0FBSSwyQ0FBYSxVQUFTLFFBQVE7QUFDOUI7QUFBQSxJQUNKO0FBRUEsUUFBSSxFQUFDLCtCQUFPLE9BQU07QUFDZDtBQUFBLElBQ0o7QUFFQSxlQUFXLFlBQVksTUFBTSxNQUFNO0FBQy9CLFdBQUssSUFBSSxTQUFTLEdBQUc7QUFBQSxJQUN6QjtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQUEsSUFDSDtBQUFBLElBQ0EsT0FBTyxjQUFjO0FBQUEsSUFDckIsTUFBTSxLQUFLO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDSjtBQUdPLFNBQVMscUJBQXFCLEtBQTZCO0FBQzlELE1BQUksUUFBUTtBQUNaLE1BQUksWUFBWTtBQUNoQixNQUFJLG1CQUFtQjtBQUN2QixNQUFJLHFCQUFxQjtBQUV6QixRQUFNLGFBQWEsb0JBQUksSUFBWTtBQUNuQyxRQUFNLFVBQVUsb0JBQUksSUFBWTtBQUVoQyxhQUFVLFFBQVEsSUFBSSxNQUFNLGlCQUFpQixHQUFHO0FBRTVDLFVBQU0sUUFBUSxJQUFJLGNBQWMsYUFBYSxJQUFJO0FBQ2pELFVBQU0sY0FBYywrQkFBTztBQUUzQixTQUFJLDJDQUFhLFVBQVMsUUFBUTtBQUM5QjtBQUFBLElBQ0o7QUFFQTtBQUdBLFVBQU0sU0FBUyxZQUFZLGFBQWE7QUFFeEMsUUFBSSxXQUFXLGFBQWE7QUFDeEI7QUFBQSxJQUNKO0FBR0EsVUFBTSxXQUFXLFlBQVksZUFBZTtBQUU1QyxRQUFJLE1BQU0sUUFBUSxRQUFRLEdBQUc7QUFFekIsVUFBSSxTQUFTLFNBQVMsR0FBRztBQUNyQjtBQUFBLE1BQ0osT0FBTztBQUNIO0FBQUEsTUFDSjtBQUVBLGlCQUFXLFFBQVEsVUFBVTtBQUN6QixZQUFJLE9BQU8sU0FBUyxZQUFZLEtBQUssS0FBSyxNQUFNLElBQUk7QUFDaEQscUJBQVcsSUFBSSxJQUFJO0FBQUEsUUFDdkI7QUFBQSxNQUNKO0FBQUEsSUFFSixXQUFXLE9BQU8sYUFBYSxZQUFZLFNBQVMsS0FBSyxNQUFNLElBQUk7QUFFL0Q7QUFDQSxpQkFBVyxJQUFJLFFBQVE7QUFBQSxJQUUzQixPQUFNO0FBRUY7QUFBQSxJQUNKO0FBR0EsVUFBTSxTQUFTLFlBQVksUUFBUTtBQUVuQyxRQUFJLE9BQU8sV0FBVyxZQUFZLE9BQU8sS0FBSyxNQUFNLElBQUk7QUFDcEQsY0FBUSxJQUFJLE1BQU07QUFBQSxJQUN0QjtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWSxXQUFXO0FBQUEsSUFDdkIsU0FBUyxRQUFRO0FBQUEsRUFDckI7QUFDSjs7O0FDbk9PLFNBQVMseUJBQ1osV0FDQSxLQUNJO0FBRUosUUFBTSxRQUFRLFVBQVUsVUFBVSxFQUFDLEtBQUssc0NBQXFDLENBQUM7QUFFOUUsUUFBTSxPQUFPLE1BQU0sVUFBVSxFQUFDLEtBQUssZ0JBQWUsQ0FBQztBQUtuRCxRQUFNLGNBQWMsS0FBSyxVQUFVLEVBQUMsS0FBSyxvQ0FBbUMsQ0FBQztBQUU3RSxjQUFZLFNBQVMsTUFBTSxFQUFDLE1BQU0sa0ZBQWdCLENBQUM7QUFFbkQsUUFBTSxTQUFTLGVBQWUsR0FBRztBQUVqQyxNQUFJLE9BQU8sV0FBVyxHQUFHO0FBRXJCLGdCQUFZLFNBQVMsS0FBSyxFQUFDLE1BQU0sc0pBQTZCLENBQUM7QUFBQSxFQUVuRSxPQUFPO0FBRUgsVUFBTSxPQUFPLFlBQVksVUFBVSxFQUFDLEtBQUssY0FBYSxDQUFDO0FBRXZELGVBQVcsU0FBUyxRQUFRO0FBRXhCLFlBQU0sT0FBTyxLQUFLLFVBQVUsRUFBQyxLQUFLLGFBQVksQ0FBQztBQUMvQyxZQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUs7QUFBQSxRQUM1QixNQUFNLE1BQU0sS0FBSztBQUFBLFFBQ2pCLEtBQUs7QUFBQSxNQUNULENBQUM7QUFFRCxXQUFLLGlCQUFpQixTQUFTLENBQUMsZUFBZTtBQUUzQyxtQkFBVyxlQUFlO0FBRTFCLGFBQUssSUFBSSxVQUFVLFFBQVEsS0FBSyxFQUFFLFNBQVMsTUFBTSxJQUFJO0FBQUEsTUFDekQsQ0FBQztBQUVELFdBQUssU0FBUyxRQUFRO0FBQUEsUUFDbEIsTUFBTSxXQUFXLE1BQU0sSUFBSTtBQUFBLFFBQzNCLEtBQUs7QUFBQSxNQUNULENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUtBLFFBQU0saUJBQWlCLEtBQUssVUFBVSxFQUFDLEtBQUssdUNBQXNDLENBQUM7QUFFbkYsaUJBQWUsU0FBUyxNQUFNO0FBQUEsSUFDMUIsTUFBTTtBQUFBLEVBQ1YsQ0FBQztBQUVELFFBQU0sWUFBWSxtQkFBbUIsR0FBRztBQUV4QyxNQUFJLFVBQVUsV0FBVyxHQUFHO0FBQ3hCLG1CQUFlLFNBQVMsS0FBSztBQUFBLE1BQ3pCLE1BQU07QUFBQSxJQUNWLENBQUM7QUFBQSxFQUVMLE9BQU87QUFFSCxVQUFNLE9BQU8sZUFBZSxVQUFVLEVBQUMsS0FBSyxnQkFBZSxDQUFDO0FBRTVELGVBQVcsWUFBWSxXQUFXO0FBRTlCLFlBQU0sT0FBTyxLQUFLLFVBQVUsRUFBQyxLQUFLLGdCQUFlLENBQUM7QUFFbEQsWUFBTSxPQUFPLEtBQUssU0FBUyxLQUFLO0FBQUEsUUFDNUIsTUFBTSxTQUFTLEtBQUs7QUFBQSxRQUNwQixLQUFLO0FBQUEsTUFDVCxDQUFDO0FBRUQsV0FBSyxpQkFBaUIsU0FBUyxDQUFDLFVBQVU7QUFFdEMsY0FBTSxlQUFlO0FBRXJCLGFBQUssSUFBSSxVQUNKLFFBQVEsS0FBSyxFQUNiLFNBQVMsU0FBUyxJQUFJO0FBQUEsTUFDL0IsQ0FBQztBQUVELFdBQUssU0FBUyxRQUFRO0FBQUEsUUFDbEIsTUFBTSxlQUFlLFNBQVMsSUFBSTtBQUFBLFFBQ2xDLEtBQUs7QUFBQSxNQUNULENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUtBLFFBQU0sZUFBZSxLQUFLLFVBQVUsRUFBQyxLQUFLLHVDQUFzQyxDQUFDO0FBRWpGLGVBQWEsU0FBUyxNQUFNLEVBQUMsTUFBTSxnSEFBcUIsQ0FBQztBQUV6RCxRQUFNLGFBQWEscUJBQXFCLEdBQUc7QUFDM0MsUUFBTSxpQkFBaUIsYUFBYSxVQUFVLEVBQUMsS0FBSyxrQkFBaUIsQ0FBQztBQUV0RSxpQkFBZSxVQUFVO0FBQUEsSUFDckIsS0FBSztBQUFBLElBQ0wsTUFBTSwrQ0FBWSxXQUFXLEtBQUs7QUFBQSxFQUN0QyxDQUFDO0FBRUQsaUJBQWUsVUFBVTtBQUFBLElBQ3JCLEtBQUs7QUFBQSxJQUNMLE1BQU0scURBQWEsV0FBVyxRQUFRO0FBQUEsRUFDMUMsQ0FBQztBQUVELGlCQUFlLFVBQVU7QUFBQSxJQUNyQixLQUFLO0FBQUEsSUFDTCxNQUFNLCtDQUFZLFdBQVcsS0FBSztBQUFBLEVBQ3RDLENBQUM7QUFFRCxpQkFBZSxVQUFVO0FBQUEsSUFDckIsS0FBSztBQUFBLElBQ0wsTUFBTSxtQ0FBVSxXQUFXLElBQUk7QUFBQSxFQUNuQyxDQUFDO0FBS0QsUUFBTSxlQUFlLEtBQUssVUFBVSxFQUFDLEtBQUssdUNBQXNDLENBQUM7QUFFakYsZUFBYSxTQUFTLE1BQU0sRUFBQyxNQUFNLDRIQUF1QixDQUFDO0FBRTNELFFBQU0sVUFBVSxxQkFBcUIsR0FBRztBQUN4QyxRQUFNLGNBQWMsYUFBYSxVQUFVLEVBQUMsS0FBSyxrQkFBaUIsQ0FBQztBQUVuRSxjQUFZLFVBQVU7QUFBQSxJQUNsQixLQUFLO0FBQUEsSUFDTCxNQUFNLGtFQUFnQixRQUFRLEtBQUs7QUFBQSxFQUN2QyxDQUFDO0FBRUQsY0FBWSxVQUFVO0FBQUEsSUFDbEIsS0FBSztBQUFBLElBQ0wsTUFBTSxvRkFBbUIsUUFBUSxTQUFTO0FBQUEsRUFDOUMsQ0FBQztBQUVELGNBQVksVUFBVTtBQUFBLElBQ2xCLEtBQUs7QUFBQSxJQUNMLE1BQU0sa0hBQXdCLFFBQVEsZ0JBQWdCO0FBQUEsRUFDMUQsQ0FBQztBQUVELGNBQVksVUFBVTtBQUFBLElBQ2xCLEtBQUs7QUFBQSxJQUNMLE1BQU0sdUdBQXVCLFFBQVEsa0JBQWtCO0FBQUEsRUFDM0QsQ0FBQztBQUVELGNBQVksVUFBVTtBQUFBLElBQ2xCLEtBQUs7QUFBQSxJQUNMLE1BQU0sMklBQTZCLFFBQVEsVUFBVTtBQUFBLEVBQ3pELENBQUM7QUFFRCxjQUFZLFVBQVU7QUFBQSxJQUNsQixLQUFLO0FBQUEsSUFDTCxNQUFNLHFJQUE0QixRQUFRLE9BQU87QUFBQSxFQUNyRCxDQUFDO0FBQ0w7QUFHQSxTQUFTLFdBQVcsTUFBb0I7QUFDcEMsU0FDSSxHQUFHLE9BQU8sS0FBSyxTQUFTLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQ3hDLE9BQU8sS0FBSyxXQUFXLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXJEO0FBR0EsU0FBUyxlQUFlLE1BQW1CO0FBRXZDLFNBQ0ksR0FBRyxPQUFPLEtBQUssUUFBUSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUN2QyxPQUFPLEtBQUssU0FBUyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUN4QyxLQUFLLFlBQVksQ0FBQyxJQUNsQixPQUFPLEtBQUssU0FBUyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUN4QyxPQUFPLEtBQUssV0FBVyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUVyRDs7O0FDakxBLFNBQVMsbUJBQW1CLEtBQVUsVUFBa0IsUUFBUSxHQUFlO0FBRTNFLFFBQU0sU0FBcUIsQ0FBQztBQUU1QixhQUFVLFFBQVEsSUFBSSxNQUFNLGlCQUFpQixHQUFHO0FBRTVDLFVBQU0sUUFBUSxJQUFJLGNBQWMsYUFBYSxJQUFJO0FBQ2pELFVBQU0sY0FBYywrQkFBTztBQUUzQixRQUFJLENBQUMsYUFBYTtBQUNkO0FBQUEsSUFDSjtBQUVBLFFBQUksWUFBWSxTQUFTLFFBQVE7QUFDN0I7QUFBQSxJQUNKO0FBRUEsUUFBSSxZQUFZLGVBQWUsTUFBTSxVQUFVO0FBQzNDO0FBQUEsSUFDSjtBQUVBLFdBQU8sS0FBSyxFQUFDLEtBQUksQ0FBQztBQUVsQixRQUFJLE9BQU8sVUFBVSxPQUFPO0FBQ3hCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQ1g7QUFHQSxTQUFTLGlCQUFpQixLQUFTLFFBQWdCLFFBQVEsR0FBZTtBQUN0RSxRQUFNLFNBQXFCLENBQUM7QUFFNUIsYUFBVyxRQUFRLElBQUksTUFBTSxpQkFBaUIsR0FBRztBQUU3QyxVQUFNLFFBQVEsSUFBSSxjQUFjLGFBQWEsSUFBSTtBQUNqRCxVQUFNLGNBQWMsK0JBQU87QUFFM0IsUUFBSSxDQUFDLGFBQWE7QUFDZDtBQUFBLElBQ0o7QUFFQSxRQUFJLFlBQVksU0FBUyxRQUFRO0FBQzdCO0FBQUEsSUFDSjtBQUVBLFFBQUksWUFBWSxhQUFhLE1BQU0sUUFBUTtBQUN2QztBQUFBLElBQ0o7QUFFQSxXQUFPLEtBQUssRUFBQyxLQUFJLENBQUM7QUFFbEIsUUFBSSxPQUFPLFVBQVUsT0FBTztBQUN4QjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBRUEsU0FBTztBQUNYO0FBR0EsZUFBc0IsV0FDbEIsS0FDQSxNQUNBLFVBQ2E7QUFFYixRQUFNLE1BQU0sb0JBQUksS0FBSztBQUVyQixRQUFNLE1BQU0sQ0FBQyxVQUEwQjtBQUNuQyxXQUFPLE9BQU8sS0FBSyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQUEsRUFDeEM7QUFFQSxRQUFNLGNBQ0YsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUNqQixJQUFJLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUN2QixJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsSUFDbEIsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLElBQ25CLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztBQUU1QixRQUFNLFVBQ047QUFBQTtBQUFBLHFCQUVpQixRQUFRO0FBQUE7QUFBQSxrQkFFWCxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQnpCLE1BQUk7QUFDQSxVQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxPQUFPO0FBRXpELFVBQU0sSUFBSSxVQUFVLFFBQVEsS0FBSyxFQUFFLFNBQVMsSUFBSTtBQUFBLEVBQ3BELFNBQVMsT0FBTztBQUNaLFlBQVEsTUFBTSwwQkFBMEIsS0FBSztBQUFBLEVBQ2pEO0FBQ0o7QUFHTyxTQUFTLFNBQVMsS0FBcUI7QUFFMUMsU0FBTztBQUFBLElBQ0gsTUFBTSxtQkFBbUIsS0FBSyxRQUFRLENBQUM7QUFBQSxJQUN2QyxRQUFRLG1CQUFtQixLQUFLLFVBQVUsQ0FBQztBQUFBLElBQzNDLE1BQU0sbUJBQW1CLEtBQUssUUFBUSxDQUFDO0FBQUEsSUFDdkMsV0FBVyxpQkFBaUIsS0FBSyxhQUFhLENBQUM7QUFBQSxJQUMvQyxTQUFTLGlCQUFpQixLQUFLLFdBQVcsQ0FBQztBQUFBLEVBQy9DO0FBQ0o7OztBQ3JJTyxTQUFTLFlBQVksV0FBd0IsS0FBZ0I7QUFFaEUsUUFBTSxRQUFRLFVBQVUsVUFBVSxFQUFDLEtBQUssd0JBQXVCLENBQUM7QUFDaEUsUUFBTSxPQUFPLE1BQU0sVUFBVSxFQUFDLEtBQUssYUFBWSxDQUFDO0FBQ2hELFFBQU0sUUFBUSxTQUFTLEdBQUc7QUFFMUI7QUFBQSxJQUNJO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsRUFDVjtBQUVBO0FBQUEsSUFDSTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1Y7QUFFQTtBQUFBLElBQ0k7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNWO0FBRUE7QUFBQSxJQUNJO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTjtBQUFBLEVBQ0o7QUFFQTtBQUFBLElBQ0k7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOO0FBQUEsRUFDSjtBQUNKO0FBR0EsU0FBUyxzQkFDTCxNQUNBLEtBQ0EsT0FDQSxXQUNBLE9BQ0k7QUFFSixRQUFNLFVBQVUsS0FBSyxVQUFVLEVBQUMsS0FBSyxnQkFBZ0IsU0FBUyxHQUFFLENBQUM7QUFFakUsVUFBUSxTQUFTLE1BQU0sRUFBQyxNQUFNLE1BQUssQ0FBQztBQUVwQyxpQkFBZSxTQUFTLEtBQUssT0FBTyxvR0FBb0I7QUFDNUQ7QUFHQSxTQUFTLG9CQUNMLE1BQ0EsS0FDQSxPQUNBLFdBQ0EsT0FDQSxXQUNJO0FBRUosUUFBTSxVQUFVLEtBQUssVUFBVSxFQUFDLEtBQUssZ0JBQWdCLFNBQVMsR0FBRSxDQUFDO0FBRWpFLFVBQVEsU0FBUyxNQUFNLEVBQUMsTUFBTSxNQUFLLENBQUM7QUFFcEMsaUJBQWUsU0FBUyxLQUFLLE9BQU8sU0FBUztBQUNqRDtBQUdBLFNBQVMsZUFDTCxTQUNBLEtBQ0EsT0FDQSxXQUNJO0FBRUosTUFBSSxNQUFNLFdBQVcsR0FBRztBQUVwQixZQUFRLFNBQVMsS0FBSyxFQUFDLE1BQU0sV0FBVyxLQUFLLGFBQVksQ0FBQztBQUUxRDtBQUFBLEVBQ0o7QUFFQSxRQUFNLE9BQU8sUUFBUSxTQUFTLElBQUk7QUFFbEMsYUFBVyxRQUFRLE9BQU87QUFFdEIsVUFBTSxPQUFPLEtBQUssU0FBUyxJQUFJO0FBQy9CLFVBQU0sT0FBTyxLQUFLLFNBQVMsS0FBSyxFQUFDLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxnQkFBZSxDQUFDO0FBRWhGLFNBQUssUUFBUSxPQUFPLEtBQUssS0FBSztBQUU5QixTQUFLLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUV0QyxZQUFNLGVBQWU7QUFFckIsV0FBSyxJQUFJLFVBQVUsUUFBUSxLQUFLLEVBQUUsU0FBUyxLQUFLLElBQUk7QUFBQSxJQUN4RCxDQUFDO0FBQUEsRUFDTDtBQUVKOzs7QUM5R08sU0FBUyxpQkFBaUIsS0FBVSxRQUFRLEdBQW1CO0FBQ2xFLFFBQU0sUUFBd0IsQ0FBQztBQUUvQixhQUFXLFFBQVEsSUFBSSxNQUFNLGlCQUFpQixHQUFHO0FBRTdDLFVBQU0sUUFBUSxJQUFJLGNBQWMsYUFBYSxJQUFJO0FBQ2pELFVBQU0sY0FBYywrQkFBTztBQUUzQixRQUFJLENBQUMsYUFBYTtBQUNkO0FBQUEsSUFDSjtBQUVBLFFBQUksWUFBWSxTQUFTLFlBQVk7QUFDakM7QUFBQSxJQUNKO0FBRUEsUUFBSSxZQUFZLGFBQWEsUUFBVztBQUNwQztBQUFBLElBQ0o7QUFFQSxVQUFNLFdBQVcsT0FBTyxZQUFZLFFBQVE7QUFFNUMsUUFBSSxDQUFDLE9BQU8sU0FBUyxRQUFRLEtBQUssWUFBWSxLQUFLO0FBQy9DO0FBQUEsSUFDSjtBQUVBLFVBQU0sS0FBSyxFQUFDLE1BQU0sU0FBUSxDQUFDO0FBQUEsRUFDL0I7QUFFQSxTQUFPLE1BQU0sS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxHQUFHLEtBQUs7QUFDdkU7OztBQ2xDTyxTQUFTLGVBQWUsV0FBdUIsS0FBZ0I7QUFFbEUsUUFBTSxRQUFRLFVBQVUsVUFBVSxFQUFDLEtBQUssMkJBQTBCLENBQUM7QUFDbkUsUUFBTSxTQUFTLE1BQU0sRUFBQyxNQUFNLG1EQUFVLENBQUM7QUFDdkMsUUFBTSxRQUFRLGlCQUFpQixHQUFHO0FBRWxDLE1BQUksTUFBTSxXQUFXLEdBQUc7QUFFcEIsVUFBTSxTQUFTLEtBQUssRUFBQyxNQUFNLGdKQUE0QixDQUFDO0FBRXhEO0FBQUEsRUFDSjtBQUVBLFFBQU0sT0FBTyxNQUFNLFVBQVUsRUFBQyxLQUFLLGdCQUFlLENBQUM7QUFFbkQsYUFBVyxVQUFVLE9BQU87QUFFeEIsVUFBTSxPQUFPLEtBQUssVUFBVSxFQUFDLEtBQUssZ0JBQWUsQ0FBQztBQUNsRCxVQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUssRUFBQyxNQUFNLE9BQU8sS0FBSyxVQUFVLEtBQUssZ0JBQWUsQ0FBQztBQUVsRixTQUFLLFFBQVEsT0FBTyxPQUFPLEtBQUs7QUFFaEMsU0FBSyxpQkFBaUIsU0FBUyxDQUFDLFVBQVU7QUFFdEMsWUFBTSxlQUFlO0FBRXJCLFdBQUssSUFBSSxVQUFVLFFBQVEsS0FBSyxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQUEsSUFDMUQsQ0FBQztBQUVELFNBQUssU0FBUyxRQUFRLEVBQUMsTUFBTSxHQUFHLE9BQU8sUUFBUSxLQUFLLEtBQUssb0JBQW1CLENBQUM7QUFBQSxFQUNqRjtBQUNKOzs7QUNsQ0EsSUFBQUMsbUJBQTRCOzs7QUNBNUIsSUFBQUMsbUJBQW1DO0FBRTVCLElBQU0sa0JBQU4sY0FBOEIsdUJBQU07QUFBQSxFQUl2QyxZQUFZLEtBQVUsVUFBa0M7QUFDcEQsVUFBTSxHQUFHO0FBQ1QsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQUVBLFNBQWU7QUFDWCxVQUFNLEVBQUMsVUFBUyxJQUFJO0FBRXBCLGNBQVUsU0FBUyxNQUFNLEVBQUMsTUFBTSx1SEFBdUIsQ0FBQztBQUV4RCxVQUFNLFFBQVEsVUFBVSxTQUFTLFNBQVM7QUFBQSxNQUN0QyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUVELFVBQU0sTUFBTTtBQUVaLFVBQU0sU0FBUyxVQUFVLFNBQVMsVUFBVTtBQUFBLE1BQ3hDLE1BQU07QUFBQSxJQUNWLENBQUM7QUFFRCxVQUFNLGFBQWEsTUFBWTtBQUMzQixZQUFNLE9BQU8sTUFBTSxNQUFNLEtBQUs7QUFFOUIsVUFBSSxDQUFDLE1BQU07QUFDUCxZQUFJLHdCQUFPLHVIQUF3QjtBQUNuQztBQUFBLE1BQ0o7QUFFQSxXQUFLLFNBQVMsSUFBSTtBQUNsQixXQUFLLE1BQU07QUFBQSxJQUNmO0FBRUEsV0FBTyxpQkFBaUIsU0FBUyxVQUFVO0FBRTNDLFVBQU0saUJBQWlCLFdBQVcsQ0FBQyxVQUFVO0FBQ3pDLFVBQUksTUFBTSxRQUFRLFNBQVM7QUFDdkIsY0FBTSxlQUFlO0FBQ3JCLG1CQUFXO0FBQUEsTUFDZjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVBLFVBQWdCO0FBQ1osU0FBSyxVQUFVLE1BQU07QUFBQSxFQUN6QjtBQUNKOzs7QUNwREEsSUFBQUMsbUJBQTJCO0FBRTNCLFNBQVNDLGdCQUFlLE1BQW9CO0FBQ3hDLFFBQU0sTUFBTSxDQUFDLFVBQTBCO0FBQ25DLFdBQU8sT0FBTyxLQUFLLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFBQSxFQUN4QztBQUVBLFNBQU87QUFBQSxJQUNILEtBQUssWUFBWTtBQUFBLElBQ2pCLElBQUksS0FBSyxTQUFTLElBQUksQ0FBQztBQUFBLElBQ3ZCLElBQUksS0FBSyxRQUFRLENBQUM7QUFBQSxFQUN0QixFQUFFLEtBQUssR0FBRyxJQUFJLE1BQU07QUFBQSxJQUNoQixJQUFJLEtBQUssU0FBUyxDQUFDO0FBQUEsSUFDbkIsSUFBSSxLQUFLLFdBQVcsQ0FBQztBQUFBLEVBQ3pCLEVBQUUsS0FBSyxHQUFHO0FBQ2Q7QUFFQSxlQUFzQixlQUNsQixLQUNBLE1BQ0EsTUFDQSxNQUNhO0FBRWIsUUFBTSxlQUFlLEdBQUcsSUFBSSxJQUFJLElBQUk7QUFDcEMsUUFBTSxjQUFjQSxnQkFBZSxvQkFBSSxLQUFLLENBQUM7QUFFN0MsUUFBTSxVQUNOO0FBQUE7QUFBQTtBQUFBLHdCQUdvQixZQUFZO0FBQUE7QUFBQSxrQkFFbEIsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnQnpCLE1BQUk7QUFDQSxVQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxPQUFPO0FBRXpELFVBQU0sSUFBSSxVQUFVLFFBQVEsS0FBSyxFQUFFLFNBQVMsSUFBSTtBQUVoRCxRQUFJLHdCQUFPLDhGQUFtQjtBQUFBLEVBQ2xDLFNBQVE7QUFDSixRQUFJLHdCQUFPLHNKQUE4QjtBQUFBLEVBQzdDO0FBQ0o7OztBQzFEQSxJQUFBQyxtQkFBbUM7QUFFNUIsSUFBTSxzQkFBTixjQUFrQyx1QkFBTTtBQUFBLEVBUTNDLFlBQ0ksS0FDQSxVQUtGO0FBQ0UsVUFBTSxHQUFHO0FBQ1QsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQUVBLFNBQWU7QUFDWCxVQUFNLEVBQUMsVUFBUyxJQUFJO0FBRXBCLGNBQVUsU0FBUyxNQUFNO0FBQUEsTUFDckIsTUFBSztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELGNBQVUsU0FBUyxTQUFTO0FBQUEsTUFDeEIsTUFBSztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUNELFVBQU0sWUFBWSxVQUFVLFNBQVMsU0FBUztBQUFBLE1BQzFDLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxjQUFVLFNBQVMsU0FBUztBQUFBLE1BQ3hCLE1BQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxVQUFNLFlBQVksVUFBVSxTQUFTLFNBQVM7QUFBQSxNQUMxQyxNQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsY0FBVSxTQUFTLFNBQVM7QUFBQSxNQUN4QixNQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsVUFBTSxZQUFZLFVBQVUsU0FBUyxTQUFTO0FBQUEsTUFDMUMsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sU0FBUyxVQUFVLFNBQVMsVUFBVTtBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxjQUFVLE1BQU07QUFFaEIsVUFBTUMsa0JBQWlCLE1BQVk7QUFDL0IsWUFBTSxPQUFPLFVBQVUsTUFBTSxLQUFLO0FBQ2xDLFlBQU0sT0FBTyxVQUFVO0FBQ3ZCLFlBQU0sT0FBTyxVQUFVO0FBRXZCLFVBQUksQ0FBQyxNQUFNO0FBQ1AsWUFBSSx3QkFBTyw0SEFBd0I7QUFDbkM7QUFBQSxNQUNKO0FBRUEsVUFBSSxDQUFDLE1BQU07QUFDUCxZQUFJLHdCQUFPLHVLQUFnQztBQUMzQztBQUFBLE1BQ0o7QUFFQSxVQUFJLENBQUMsTUFBTTtBQUNQLFlBQUksd0JBQU8sdUtBQWdDO0FBQzNDO0FBQUEsTUFDSjtBQUVBLFdBQUssU0FBUyxNQUFNLE1BQU0sSUFBSTtBQUM5QixXQUFLLE1BQU07QUFBQSxJQUNmO0FBRUEsV0FBTyxpQkFBaUIsU0FBU0EsZUFBYztBQUUvQyxjQUFVLGlCQUFpQixXQUFXLENBQUMsVUFBVTtBQUM3QyxVQUFJLE1BQU0sUUFBUSxTQUFTO0FBQ3ZCLGNBQU0sZUFBZTtBQUNyQixRQUFBQSxnQkFBZTtBQUFBLE1BQ25CO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsVUFBZ0I7QUFDWixTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3pCO0FBQ0o7OztBQ3RHQSxJQUFBQyxtQkFBbUM7QUFFNUIsSUFBTSxxQkFBTixjQUFpQyx1QkFBTTtBQUFBLEVBTzFDLFlBQ0ksS0FDQSxVQUtGO0FBQ0UsVUFBTSxHQUFHO0FBQ1QsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQUVBLFNBQWU7QUFDWCxVQUFNLEVBQUUsVUFBVSxJQUFJO0FBRXRCLGNBQVUsU0FBUyxNQUFNO0FBQUEsTUFDckIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELGNBQVUsU0FBUyxTQUFTO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUNELFVBQU0sWUFBWSxVQUFVLFNBQVMsU0FBUztBQUFBLE1BQzFDLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxjQUFVLFNBQVMsU0FBUztBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxVQUFNLGVBQWUsVUFBVSxTQUFTLFNBQVM7QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsY0FBVSxTQUFTLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsVUFBTSxnQkFBZ0IsVUFBVSxTQUFTLFNBQVM7QUFBQSxNQUM5QyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsVUFBTSxTQUFTLFVBQVUsU0FBUyxVQUFVO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELGNBQVUsTUFBTTtBQUVoQixVQUFNQyxpQkFBZ0IsTUFBWTtBQUM5QixZQUFNLE9BQU8sVUFBVSxNQUFNLEtBQUs7QUFDbEMsWUFBTSxVQUFVLGFBQWEsTUFBTSxLQUFLO0FBQ3hDLFlBQU0sV0FBVyxjQUFjLE1BQU0sS0FBSztBQUUxQyxVQUFJLENBQUMsTUFBTTtBQUNQLFlBQUksd0JBQU8sc0hBQXVCO0FBQ2xDO0FBQUEsTUFDSjtBQUVBLFVBQUksQ0FBQyxTQUFTO0FBQ1YsWUFBSSx3QkFBTyw0SEFBd0I7QUFDbkM7QUFBQSxNQUNKO0FBRUEsVUFBSSxDQUFDLFVBQVU7QUFDWCxZQUFJLHdCQUFPLDhJQUEyQjtBQUN0QztBQUFBLE1BQ0o7QUFFQSxXQUFLLFNBQVMsTUFBTSxTQUFTLFFBQVE7QUFDckMsV0FBSyxNQUFNO0FBQUEsSUFDZjtBQUVBLFdBQU8saUJBQWlCLFNBQVNBLGNBQWE7QUFFOUMsa0JBQWMsaUJBQWlCLFdBQVcsQ0FBQyxVQUFVO0FBQ2pELFVBQUksTUFBTSxRQUFRLFNBQVM7QUFDdkIsY0FBTSxlQUFlO0FBQ3JCLFFBQUFBLGVBQWM7QUFBQSxNQUNsQjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVBLFVBQWdCO0FBQ1osU0FBSyxVQUFVLE1BQU07QUFBQSxFQUN6QjtBQUNKOzs7QUN2R0EsSUFBQUMsbUJBQW1DO0FBRTVCLElBQU0sa0JBQU4sY0FBOEIsdUJBQU07QUFBQSxFQU92QyxZQUNJLEtBQ0EsVUFJRjtBQUNFLFVBQU0sR0FBRztBQUNULFNBQUssV0FBVztBQUFBLEVBQ3BCO0FBQUEsRUFFQSxTQUFlO0FBQ1gsVUFBTSxFQUFFLFVBQVUsSUFBSTtBQUV0QixjQUFVLFNBQVMsTUFBTTtBQUFBLE1BQ3JCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxjQUFVLFNBQVMsU0FBUztBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxVQUFNLFlBQVksVUFBVSxTQUFTLFNBQVM7QUFBQSxNQUMxQyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsY0FBVSxTQUFTLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsVUFBTSxpQkFBaUIsVUFBVSxTQUFTLFVBQVU7QUFBQSxNQUNoRCxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsbUJBQWUsU0FBUyxVQUFVO0FBQUEsTUFDOUIsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1gsQ0FBQztBQUNELG1CQUFlLFNBQVMsVUFBVTtBQUFBLE1BQzlCLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNYLENBQUM7QUFDRCxtQkFBZSxTQUFTLFVBQVU7QUFBQSxNQUM5QixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDWCxDQUFDO0FBQ0QsbUJBQWUsUUFBUTtBQUV2QixVQUFNLFNBQVMsVUFBVSxTQUFTLFVBQVU7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsY0FBVSxNQUFNO0FBRWhCLFVBQU1DLGNBQWEsTUFBWTtBQUMzQixZQUFNLE9BQU8sVUFBVSxNQUFNLEtBQUs7QUFDbEMsWUFBTSxXQUFXLGVBQWU7QUFFaEMsVUFBSSxDQUFDLE1BQU07QUFDUCxZQUFJLHdCQUFPLDZIQUF5QjtBQUNwQztBQUFBLE1BQ0o7QUFFQSxXQUFLLFNBQVMsTUFBTSxRQUFRO0FBQzVCLFdBQUssTUFBTTtBQUFBLElBQ2Y7QUFFQSxXQUFPLGlCQUFpQixTQUFTQSxXQUFVO0FBRTNDLGNBQVUsaUJBQWlCLFdBQVcsQ0FBQyxVQUFVO0FBQzdDLFVBQUksTUFBTSxRQUFRLFNBQVM7QUFDdkIsY0FBTSxlQUFlO0FBQ3JCLFFBQUFBLFlBQVc7QUFBQSxNQUNmO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsVUFBZ0I7QUFDWixTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3pCO0FBQ0o7OztBQzFGTyxTQUFTLFlBQ1osS0FDQSxPQUNPO0FBQ1AsUUFBTSxjQUFjLE1BQU0sS0FBSyxFQUFFLFlBQVk7QUFFN0MsTUFBSSxDQUFDLGFBQWE7QUFDZCxXQUFPLENBQUM7QUFBQSxFQUNaO0FBRUEsU0FBTyxJQUFJLE1BQ04saUJBQWlCLEVBQ2pCO0FBQUEsSUFBTyxVQUNKLEtBQUssU0FBUyxZQUFZLEVBQUUsU0FBUyxXQUFXO0FBQUEsRUFDcEQ7QUFDUjs7O0FOUE8sU0FBUyxtQkFBbUIsV0FBd0IsS0FBZ0I7QUFFdkUsUUFBTSxRQUFRLFVBQVUsVUFBVSxFQUFDLEtBQUssZ0NBQStCLENBQUM7QUFNeEUsUUFBTSxjQUFjLE1BQU0sVUFBVSxFQUFDLEtBQUssZUFBYyxDQUFDO0FBQ3pELFFBQU0sYUFBYSxZQUFZLFVBQVUsRUFBQyxLQUFLLG9CQUFtQixDQUFDO0FBQ25FLFFBQU0sYUFBYSxXQUFXLFNBQVMsVUFBVTtBQUFBLElBQzdDLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxFQUNULENBQUM7QUFDRCxhQUFXLGFBQWEsU0FBUyxzSEFBdUI7QUFFeEQsUUFBTSxpQkFBaUIsV0FBVyxTQUFTLFVBQVU7QUFBQSxJQUNqRCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDVCxDQUFDO0FBQ0QsaUJBQWUsYUFBYSxTQUFTLDRIQUF3QjtBQU03RCxRQUFNLGtCQUFrQixZQUFZLFVBQVUsRUFBQyxLQUFLLGVBQWMsQ0FBQztBQUNuRSxRQUFNLGNBQWMsZ0JBQWdCLFNBQVMsU0FBUztBQUFBLElBQ2xELE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQ0QsUUFBTSxnQkFBZ0IsZ0JBQWdCLFVBQVU7QUFBQSxJQUM1QyxLQUFLO0FBQUEsRUFDVCxDQUFDO0FBRUQsY0FBWSxpQkFBaUIsU0FBUyxNQUFNO0FBQ3hDLGtCQUFjLE1BQU07QUFFcEIsVUFBTSxRQUFRLFlBQVksTUFBTSxLQUFLO0FBRXJDLFFBQUksQ0FBQyxPQUFPO0FBQ1I7QUFBQSxJQUNKO0FBRUEsVUFBTSxRQUFRLFlBQVksS0FBSyxLQUFLO0FBRXBDLGVBQVcsUUFBUSxPQUFPO0FBQ3RCLFlBQU0sU0FBUyxjQUFjLFNBQVMsVUFBUztBQUFBLFFBQzNDLE1BQU0sS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUVELGFBQU8saUJBQWlCLFNBQVMsTUFBTTtBQUNuQyxhQUFLLElBQUksVUFDSixRQUFRLEtBQUssRUFDYixTQUFTLElBQUk7QUFFbEIsb0JBQVksUUFBUTtBQUNwQixzQkFBYyxNQUFNO0FBQUEsTUFDeEIsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKLENBQUM7QUFNRCxRQUFNLGNBQWMsWUFBWSxVQUFVLEVBQUMsS0FBSyxxQkFBb0IsQ0FBQztBQUNyRSxRQUFNLGdCQUFnQixZQUFZLFNBQVMsVUFBVTtBQUFBLElBQ2pELE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxFQUNULENBQUM7QUFDRCxnQkFBYyxhQUFhLFNBQVMsc0hBQXVCO0FBRTNELFFBQU0sYUFBYSxZQUFZLFNBQVMsVUFBVTtBQUFBLElBQzlDLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxFQUNULENBQUM7QUFDRCxhQUFXLGFBQWEsU0FBUyw0SEFBd0I7QUFNekQsUUFBTSxrQkFBa0IsTUFBTSxVQUFVLEVBQUMsS0FBSyxtQkFBa0IsQ0FBQztBQUNqRSxRQUFNLG1CQUFtQixnQkFBZ0IsU0FBUyxVQUFVO0FBQUEsSUFDeEQsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUNELG1CQUFpQixhQUFhLFNBQVMsK0dBQXFCO0FBRTVELFFBQU0sZ0JBQWdCLGdCQUFnQixTQUFTLFVBQVU7QUFBQSxJQUNyRCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDVCxDQUFDO0FBQ0QsZ0JBQWMsYUFBYSxTQUFTLCtHQUFxQjtBQUV6RCxRQUFNLGlCQUFpQixnQkFBZ0IsU0FBUyxVQUFVO0FBQUEsSUFDdEQsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUNELGlCQUFlLGFBQWEsU0FBUywySEFBdUI7QUFNNUQsYUFBVyxpQkFBaUIsU0FBUyxNQUFNO0FBQ3ZDLFFBQUksZ0JBQWdCLEtBQUssT0FBTyxTQUFTO0FBQ3JDLFVBQUk7QUFDQSxjQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFO0FBRXBELGNBQU0sSUFBSSxVQUFVLFFBQVEsS0FBSyxFQUFFLFNBQVMsSUFBSTtBQUFBLE1BQ3BELFNBQVE7QUFDSixZQUFJLHdCQUFPLHNKQUE4QjtBQUFBLE1BQzdDO0FBQUEsSUFDSixDQUFDLEVBQUUsS0FBSztBQUFBLEVBQ1osQ0FBQztBQUVELGlCQUFlLGlCQUFpQixTQUFTLE1BQU07QUFDM0MsUUFBSSxvQkFBb0IsS0FBSyxPQUFPLE1BQU0sTUFBTSxTQUFTO0FBQ3JELFlBQU0sZUFBZSxLQUFLLE1BQU0sTUFBTSxJQUFJO0FBQUEsSUFDOUMsQ0FBQyxFQUFFLEtBQUs7QUFBQSxFQUNaLENBQUM7QUFFRCxnQkFBYyxpQkFBaUIsU0FBUyxNQUFNO0FBQzFDLFFBQUksbUJBQW1CLEtBQUssT0FBTyxNQUFNLFNBQVMsYUFBYTtBQUMzRCxZQUFNLGNBQWMsS0FBSyxNQUFNLFNBQVMsUUFBUTtBQUFBLElBQ3BELENBQUMsRUFBRSxLQUFLO0FBQUEsRUFDWixDQUFDO0FBRUQsYUFBVyxpQkFBaUIsU0FBUyxNQUFNO0FBQ3ZDLFFBQUksZ0JBQWdCLEtBQUssT0FBTyxNQUFNLGFBQWE7QUFDL0MsWUFBTSxXQUFXLEtBQUssTUFBTSxRQUFRO0FBQUEsSUFDeEMsQ0FBQyxFQUFFLEtBQUs7QUFBQSxFQUNaLENBQUM7QUFFRCxtQkFBaUIsaUJBQWlCLFNBQVMsTUFBTTtBQUM3QyxRQUFJLHdCQUFPLDBMQUFvQztBQUFBLEVBQ25ELENBQUM7QUFFRCxnQkFBYyxpQkFBaUIsU0FBUyxNQUFNO0FBQzFDLFFBQUksd0JBQU8sMExBQW9DO0FBQUEsRUFDbkQsQ0FBQztBQUVELGlCQUFlLGlCQUFpQixTQUFTLE1BQU07QUFDM0MsUUFBSSx3QkFBTywwTEFBb0M7QUFBQSxFQUNuRCxDQUFDO0FBR0QsT0FBSztBQUNUOzs7QWJqSkMsSUFBTSxzQkFBc0I7QUFFNUIsSUFBTSxnQkFBTixjQUE0QiwwQkFBUztBQUFBLEVBR2xDLFlBQVksTUFBcUIsU0FBaUI7QUFDOUMsVUFBTSxJQUFJO0FBRVYsU0FBSyxVQUFVO0FBQUEsRUFDbkI7QUFBQSxFQUVBLGNBQXNCO0FBQ2xCLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxpQkFBeUI7QUFDckIsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLE1BQU0scUJBQW9DO0FBQ3RDLFVBQU0sWUFBWSxLQUFLLFlBQVk7QUFBQSxNQUMvQjtBQUFBLElBQ0o7QUFDQSxRQUFJLEVBQUUscUJBQXFCLGNBQWM7QUFDckM7QUFBQSxJQUNKO0FBRUEsY0FBVSxNQUFNO0FBRWhCLFVBQU0sa0JBQWtCLFdBQVcsS0FBSyxHQUFHO0FBQUEsRUFDL0M7QUFBQSxFQUdBLE1BQU0sU0FBd0I7QUFDMUIsVUFBTSxZQUFZLEtBQUs7QUFFdkIsY0FBVSxNQUFNO0FBRWhCLGNBQVUsU0FBUyxnQkFBZ0I7QUFFbkMsVUFBTSxZQUFZLFVBQVUsVUFBVTtBQUFBLE1BQ2xDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFLRCxVQUFNLFdBQVcsVUFBVSxVQUFVO0FBQUEsTUFDakMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0saUJBQWlCLFVBQVUsVUFBVTtBQUFBLE1BQ3ZDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLFdBQVcsVUFBVSxVQUFVO0FBQUEsTUFDakMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQU1ELFVBQU0sY0FBYyxVQUFVLFVBQVU7QUFBQSxNQUNwQyxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsVUFBTSxlQUFlLFVBQVUsVUFBVTtBQUFBLE1BQ3JDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLFdBQVcsYUFBYSxVQUFVO0FBQUEsTUFDcEMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sUUFBUSxVQUFVLFVBQVU7QUFBQSxNQUM5QixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBTUQsVUFBTSxXQUFXLFVBQVUsVUFBVTtBQUFBLE1BQ2pDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLGVBQWUsYUFBYSxVQUFVO0FBQUEsTUFDeEMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0scUJBQXFCLGFBQWEsVUFBVTtBQUFBLE1BQzlDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLGdCQUFnQixtQkFBbUIsVUFBVTtBQUFBLE1BQy9DLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxrQkFBYyxRQUFRLHNDQUFzQztBQUU1RCxVQUFNLFVBQVUsbUJBQW1CLFVBQVU7QUFBQSxNQUN6QyxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsWUFBUSxRQUFRLGNBQWMsS0FBSyxPQUFPLEVBQUU7QUFNNUMsbUJBQWUsVUFBVSxLQUFLLEdBQUc7QUFFakMseUJBQXFCLGdCQUFnQixLQUFLLEdBQUc7QUFFN0MsbUJBQWUsUUFBUTtBQUV2QixVQUFNLGtCQUFrQixhQUFhLEtBQUssR0FBRztBQUU3Qyw2QkFBeUIsVUFBVSxLQUFLLEdBQUc7QUFFM0MsZ0JBQVksT0FBTyxLQUFLLEdBQUc7QUFFM0IsbUJBQWUsVUFBVSxLQUFLLEdBQUc7QUFFakMsdUJBQW1CLGNBQWMsS0FBSyxHQUFHO0FBQUEsRUFDN0M7QUFBQSxFQUVBLE1BQWdCLFVBQXlCO0FBQUEsRUFFekM7QUFDSDtBQUVBLElBQXFCLGtCQUFyQixjQUE2Qyx3QkFBTTtBQUFBLEVBRWhELE1BQU0sU0FBd0I7QUFFMUIsU0FBSztBQUFBLE1BQ0Q7QUFBQSxNQUNBLENBQUMsU0FBUyxJQUFJLGNBQWMsTUFBTSxLQUFLLFNBQVMsT0FBTztBQUFBLElBQzNEO0FBRUEsU0FBSztBQUFBLE1BQ0QsS0FBSyxJQUFJLFVBQVU7QUFBQSxRQUNmO0FBQUEsUUFBYSxDQUFDLFNBQVM7QUFFbkIsY0FBSSxDQUFDLE1BQU07QUFDUDtBQUFBLFVBQ0o7QUFFQSxnQkFBTSxZQUFZO0FBRWQsa0JBQU0sbUJBQW1CLEtBQUssS0FBSyxJQUFJO0FBRXZDLGtCQUFNLFNBQ0YsS0FBSyxJQUFJLFVBQVU7QUFBQSxjQUNmO0FBQUEsWUFDSjtBQUVKLHVCQUFXLFFBQVEsUUFBUTtBQUV2QixrQkFBSSxLQUFLLGdCQUFnQixlQUFlO0FBQ3BDLHNCQUFNLEtBQUssS0FBSyxtQkFBbUI7QUFBQSxjQUN2QztBQUFBLFlBQ0o7QUFBQSxVQUVKLEdBQUc7QUFBQSxRQUNQO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFFQSxTQUFLLFdBQVc7QUFBQSxNQUNaLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTTtBQUNaLGFBQUssYUFBYTtBQUFBLE1BQ3RCO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsTUFBTSxXQUEwQjtBQUFBLEVBRWhDO0FBQUEsRUFFQSxNQUFNLGVBQThCO0FBRWhDLFVBQU0saUJBQWlCLEtBQUssSUFBSSxVQUFVLGdCQUFnQixtQkFBbUI7QUFFekUsUUFBSSxlQUFlLFNBQVMsR0FBRztBQUMzQixXQUFLLElBQUksVUFBVSxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBRS9DO0FBQUEsSUFDSjtBQUVBLFVBQU0sT0FBTyxLQUFLLElBQUksVUFBVSxRQUFRLElBQUk7QUFFNUMsVUFBTSxLQUFLLGFBQWE7QUFBQSxNQUNwQixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsSUFDWixDQUFDO0FBRUQsU0FBSyxJQUFJLFVBQVUsV0FBVyxJQUFJO0FBQUEsRUFDMUM7QUFDSDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJmb3JtYXREYXRlVGltZSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiY3JlYXRlRGVhZGxpbmUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImNyZWF0ZVByb2plY3QiLCAiaW1wb3J0X29ic2lkaWFuIiwgImNyZWF0ZVRhc2siXQp9Cg==
