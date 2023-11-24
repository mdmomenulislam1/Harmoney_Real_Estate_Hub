

const FAQS = () => {
  return (
    <div className="join join-vertical mx-10 my-10">

      <div className="collapse collapse-arrow join-item border-2 border-yellow-600">
        <input type="radio" name="my-accordion-4" checked="checked" />
        <div className="font-bold text-yellow-600 collapse-title text-xl">
          What is One way data binding?
        </div>
        <div className="collapse-content">
          <p className="text-justify font-semibold">One-way data binding is a mechanism in web development that ensures that changes in a data source automatically update the user interface (UI) elements that are bound to that data. In this approach, data flows from the source to the UI, ensuring that any modifications in the data reflect on the screen. However, it's important to note that one-way data binding does not allow user interactions within the UI to directly affect the data source. This separation between data and UI helps maintain clarity and simplifies the management of the UI as the underlying data changes, making it a fundamental concept in various web frameworks and libraries.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-bold text-yellow-600">
          What is NPM in node.js?
        </div>
        <div className="collapse-content">
          <p className="text-justify font-semibold">NPM, short for "Node Package Manager," is a vital tool in the world of Node.js, a popular JavaScript runtime environment. It serves as a package manager, simplifying the process of handling dependencies in Node.js projects. With NPM, developers can effortlessly install, manage, and share packages and libraries. They specify project dependencies in a "package.json" file, and NPM takes care of downloading and installing the required packages along with their dependencies. NPM also provides a command-line interface (CLI) with commands like "npm install" for package installation and "npm start" for running Node.js applications. It's a helpful tool for version management, ensuring that projects use compatible package versions and simplifying updates. Additionally, NPM allows developers to publish their own packages to a global registry, making it easy for others to discover, use, and contribute to open-source projects. Lastly, NPM's scripting capabilities enable developers to define custom tasks within their projects, such as testing and building processes, streamlining Node.js development.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-bold text-yellow-600">
          Different between Mongodb database vs mySQL database
        </div>
        <div className="collapse-content">
          <p className="text-justify font-semibold">MongoDB and MySQL are two popular database systems with distinct characteristics. MongoDB is a NoSQL database that uses a flexible document data model, allowing for the storage of data in BSON format with varying document structures in the same collection. It's ideal for applications with evolving schemas and high read and write loads. In contrast, MySQL is a relational database (RDBMS) that enforces a structured schema, making it suitable for applications with fixed data structures and complex queries. While MongoDB excels in horizontal scaling and offers flexibility, MySQL is known for its strong ACID compliance and is widely used in applications that require transactions and data integrity. The choice between them depends on your project's specific needs, data model, and scalability requirements.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQS;